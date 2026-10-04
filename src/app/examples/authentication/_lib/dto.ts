// Data Transfer Objects: decide which fields may leave the server.
// Whatever a Server Component passes to a Client Component (or renders)
// ends up in the RSC payload, so whole database rows must never get there.
import "server-only";
import type { User } from "./db";

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
