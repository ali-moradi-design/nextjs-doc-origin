// The cookie is valid but the user is gone (deleted by an admin, or the
// fake database was reset by a restart). A stateless session can't be
// revoked on the server: only the DAL's database check notices.
export function AccountGone() {
  return (
    <div className="space-y-3 rounded-2xl border border-amber-300 p-6 dark:border-amber-800">
      <h2 className="font-semibold">This account no longer exists</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Your session cookie is still valid (its signature checks out), but the
        user it points to is not in the database anymore. The proxy only reads
        the cookie, so it let you in; getUser() in the DAL caught it. Log out to
        delete the cookie.
      </p>
    </div>
  );
}
