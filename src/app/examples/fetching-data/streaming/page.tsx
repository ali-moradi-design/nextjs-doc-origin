import { connection } from "next/server";
import { Suspense } from "react";
import { AlbumsCard, ArtistCard, TracksCard } from "../_components/artist-cards";
import { CardSkeleton, PageIntro } from "../_components/ui";
import { elapsed, getAlbums, getArtist, getRequestStart, getTopTracks } from "../_lib/db";

// Each async component fetches its own data. Siblings render in parallel,
// so all three queries start at the same time.
async function Artist() {
  const artist = await getArtist("nova");
  return <ArtistCard artist={artist} readyAt={elapsed()} />;
}

async function Albums() {
  const albums = await getAlbums("nova");
  return <AlbumsCard albums={albums} readyAt={elapsed()} />;
}

async function Tracks() {
  const tracks = await getTopTracks("nova");
  return <TracksCard tracks={tracks} readyAt={elapsed()} />;
}

export default async function Page() {
  await connection();
  getRequestStart();

  return (
    <div className="space-y-6">
      {/* Outside any <Suspense>: sent to the browser immediately. */}
      <PageIntro title="Streaming" expected="0s, then 1s / 1.5s / 2s">
        <p>
          The page appeared instantly with skeletons. Each card replaced its
          skeleton the moment its own data was ready. Refresh to watch again.
        </p>
      </PageIntro>

      {/* ✅ One boundary per independent piece: each streams in on its own. */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Suspense fallback={<CardSkeleton title="Artist" />}>
          <Artist />
        </Suspense>
        <Suspense fallback={<CardSkeleton title="Albums" />}>
          <Albums />
        </Suspense>
        <Suspense fallback={<CardSkeleton title="Top tracks" />}>
          <Tracks />
        </Suspense>
      </div>
    </div>
  );
}
