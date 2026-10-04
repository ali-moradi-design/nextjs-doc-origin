// Data Transfer Objects: decide which fields may leave the server.
// Whatever a Server Component passes to a Client Component (or renders)
// ends up in the RSC payload, so whole database rows must never get there.
import "server-only";
import type { SessionRow, User } from "./db";

export type UserDTO = ReturnType<typeof toUserDTO>;
export type MemberDTO = ReturnType<typeof toMemberDTO>;

export function toUserDTO(user: User) {
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

function canSeeEmail(viewer: UserDTO, user: User) {
  return viewer.role === "admin" || viewer.id === user.id;
}

export function toMemberDTO(user: User, viewer: UserDTO) {
  return {
    id: user.id,
    name: user.name,
    role: user.role,
    // null, not a masked string: the real value never leaves the server.
    email: canSeeEmail(viewer, user) ? user.email : null,
    isYou: user.id === viewer.id,
  };
}

export type SessionDTO = ReturnType<typeof toSessionDTO>;

// A short device name instead of the whole user-agent string.
function deviceName(userAgent: string) {
  if (userAgent.includes("HeadlessChrome")) return "Headless Chrome";
  if (userAgent.includes("Firefox/")) return "Firefox";
  if (userAgent.includes("Edg/")) return "Edge";
  if (userAgent.includes("Chrome/")) return "Chrome";
  if (userAgent.includes("Safari/")) return "Safari";
  if (userAgent.startsWith("curl/")) return "curl";
  return "Unknown device";
}

export function toSessionDTO(row: SessionRow, currentId?: string) {
  return {
    id: row.id,
    device: deviceName(row.userAgent),
    createdAt: row.createdAt.toISOString(),
    lastSeenAt: row.lastSeenAt.toISOString(),
    isCurrent: row.id === currentId,
  };
}
