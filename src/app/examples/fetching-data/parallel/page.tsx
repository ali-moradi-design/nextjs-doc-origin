import { connection } from "next/server";
import { AlbumsCard, ArtistCard, TracksCard } from "../_components/artist-cards";
import { PageIntro } from "../_components/ui";
import { elapsed, getAlbums, getArtist, getRequestStart, getTopTracks } from "../_lib/db";

export default async function Page() {
  await connection();
  getRequestStart();

  // ✅ Calling the functions (without await) starts all three queries now.
  const artistData = getArtist("nova");
  const albumsData = getAlbums("nova");
  const tracksData = getTopTracks("nova");

  // Then wait for all of them together. Total = the slowest one (2s).
  // If one can fail on its own, use Promise.allSettled instead.
  const [artist, albums, tracks] = await Promise.all([
    artistData,
    albumsData,
    tracksData,
  ]);
  const readyAt = elapsed();

  return (
    <div className="space-y-6">
      <PageIntro title="Parallel" expected="~2s">
        <p>
          The same three queries, started at the same time. The terminal shows
          all three starting at ~0ms. Faster, but the page still waits for the
          slowest query before showing anything.
        </p>
      </PageIntro>
      <div className="grid gap-4 sm:grid-cols-3">
        <ArtistCard artist={artist} readyAt={readyAt} />
        <AlbumsCard albums={albums} readyAt={readyAt} />
        <TracksCard tracks={tracks} readyAt={readyAt} />
      </div>
    </div>
  );
}
