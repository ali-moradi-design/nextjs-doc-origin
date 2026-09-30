import Image from "next/image";
import { getQueryCount, type Post } from "../_lib/data";

export function PostArticle({
  post,
  ogImage,
}: {
  post: Post;
  ogImage: string;
}) {
  return (
    <article className="space-y-4">
      <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
      <p className="text-zinc-600 dark:text-zinc-400">{post.description}</p>
      <p className="text-sm">
        getPost ran <strong>{getQueryCount()}</strong> time(s) in this request,
        although generateMetadata and the page both called it.
      </p>
      <figure className="space-y-2">
        <Image
          src={ogImage}
          alt="OG image of this page"
          width={1200}
          height={630}
          unoptimized
          className="rounded-xl border border-zinc-200 dark:border-zinc-800"
        />
        <figcaption className="text-xs text-zinc-500">
          og:image of this page: <a href={ogImage}>{ogImage}</a>
        </figcaption>
      </figure>
    </article>
  );
}
