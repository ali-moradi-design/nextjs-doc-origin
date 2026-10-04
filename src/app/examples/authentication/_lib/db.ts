// A fake in-memory user table. Real apps would use a database or an auth
// provider. Data lives in server memory, so it resets when the server
// restarts (session cookies don't: see the "account no longer exists" case
// on the dashboard).
import "server-only";
import { randomBytes, randomUUID, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import type { Role } from "./constants";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  passwordHash: string;
  createdAt: string;
};

const scryptAsync = promisify(scrypt) as (
  password: string,
  salt: string,
  keylen: number,
) => Promise<Buffer>;

// The docs use bcrypt; Node's built-in scrypt is also a slow, salted
// password hash, so no extra package is needed. Format: "salt:hash".
export async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = await scryptAsync(password, salt, 64);
  return `${salt}:${hash.toString("hex")}`;
}

async function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  const candidate = await scryptAsync(password, salt, 64);
  // Constant-time compare: the time taken does not leak how many bytes match.
  return timingSafeEqual(candidate, Buffer.from(hash, "hex"));
}

// Kept on globalThis so it survives hot reloads during `pnpm dev`.
const globalStore = globalThis as typeof globalThis & {
  authUsers?: Promise<Map<string, User>>;
};

async function seed() {
  const users = new Map<string, User>();
  const demo = [
    { name: "Ada Admin", email: "admin@example.com", role: "admin" as const },
    { name: "Bob User", email: "bob@example.com", role: "user" as const },
  ];
  for (const { name, email, role } of demo) {
    const id = randomUUID();
    users.set(id, {
      id,
      name,
      email,
      role,
      passwordHash: await hashPassword(
        role === "admin" ? "Admin123!" : "User123!",
      ),
      createdAt: new Date().toISOString(),
    });
  }
  return users;
}

function table() {
  return (globalStore.authUsers ??= seed());
}

// Slow down a little so pending states are visible.
export function sleep(ms = 600) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function findUserById(id: string) {
  return (await table()).get(id);
}

export async function findUserByEmail(email: string) {
  const normalized = email.toLowerCase();
  for (const user of (await table()).values()) {
    if (user.email === normalized) return user;
  }
}

export async function listUsers() {
  return [...(await table()).values()];
}

export async function insertUser(input: {
  name: string;
  email: string;
  password: string;
}) {
  const id = randomUUID();
  const user: User = {
    id,
    name: input.name,
    email: input.email.toLowerCase(),
    role: "user",
    passwordHash: await hashPassword(input.password),
    createdAt: new Date().toISOString(),
  };
  (await table()).set(id, user);
  return user;
}

// Like ON DELETE CASCADE: a deleted user's database sessions go too, so
// they are logged out at once. (Their stateless cookies keep working.)
export async function deleteUser(id: string) {
  await deleteSessionsForUser(id);
  return (await table()).delete(id);
}

// Returns the user only if the password matches. Both "no such email" and
// "wrong password" return undefined, so the caller shows one message.
export async function checkCredentials(email: string, password: string) {
  const user = await findUserByEmail(email);
  if (!user) {
    // Hash anyway so a missing email takes as long as a wrong password.
    await hashPassword(password);
    return undefined;
  }
  return (await verifyPassword(password, user.passwordHash)) ? user : undefined;
}

// ---------------------------------------------------------------------------
// The sessions table, used only by database sessions.

export type SessionRow = {
  id: string;
  userId: string;
  userAgent: string;
  createdAt: Date;
  lastSeenAt: Date;
  expiresAt: Date;
};

const globalSessions = globalThis as typeof globalThis & {
  authSessions?: Map<string, SessionRow>;
};

function sessions() {
  return (globalSessions.authSessions ??= new Map());
}

export async function insertSession(input: {
  userId: string;
  userAgent: string;
  expiresAt: Date;
}) {
  const now = new Date();
  const row: SessionRow = {
    id: randomUUID(),
    ...input,
    createdAt: now,
    lastSeenAt: now,
  };
  sessions().set(row.id, row);
  return row;
}

// Returns the row only while it is not expired.
export async function findSession(id: string) {
  const row = sessions().get(id);
  if (!row) return undefined;
  if (row.expiresAt.getTime() < Date.now()) {
    sessions().delete(id);
    return undefined;
  }
  return row;
}

// Sliding expiry, stored in the row (the database is the source of truth).
export async function touchSession(id: string, expiresAt: Date) {
  const row = sessions().get(id);
  if (!row) return;
  row.lastSeenAt = new Date();
  row.expiresAt = expiresAt;
}

export async function listSessionsForUser(userId: string) {
  return [...sessions().values()]
    .filter((row) => row.userId === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export async function deleteSessionRow(id: string) {
  return sessions().delete(id);
}

export async function deleteSessionsForUser(userId: string, exceptId?: string) {
  for (const row of sessions().values()) {
    if (row.userId === userId && row.id !== exceptId) {
      sessions().delete(row.id);
    }
  }
}
