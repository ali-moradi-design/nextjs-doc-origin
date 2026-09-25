import { connection } from "next/server";
import { Suspense } from "react";
import PostList from "../_components/post-list";
import { CardSkeleton, PageIntro } from "../_components/ui";
import { elapsed, getPosts, getRequestStart } from "../_lib/db";

export default async function Page() {
  await connection();
  getRequestStart();

  // ✅ No await: the query starts on the server right now, and the Promise
  // itself is passed down. Promises are serializable, so they can cross
  // the Server → Client boundary.
  const posts = getPosts();
  const readyAt = posts.then(() => elapsed());

  return (
    <div className="space-y-6">
      <PageIntro title="use() in a Client Component" expected="0s, then 1.5s">
        <p>
          The query ran on the server, but the list is a Client Component, so
          the tag filter works without another request. Try the buttons.
        </p>
      </PageIntro>
      <Suspense fallback={<CardSkeleton title="Posts" />}>
        <PostList posts={posts} readyAt={readyAt} />
      </Suspense>
    </div>
  );
}
