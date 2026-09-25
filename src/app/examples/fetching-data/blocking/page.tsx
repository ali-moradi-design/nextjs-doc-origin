import { connection } from "next/server";
import { AlbumsCard, ArtistCard, TracksCard } from "../_components/artist-cards";
import { PageIntro } from "../_components/ui";
import { elapsed, getAlbums, getArtist, getRequestStart, getTopTracks } from "../_lib/db";

export default async function Page() {
  // Render on every request (otherwise the page would be prerendered at
  // build time and the delays would happen only once, during the build).
  await connection();
  getRequestStart();

  // ❌ These requests don't depend on each other, but each `await` waits
  // for the previous one to finish before the next one even starts.
  const artist = await getArtist("nova"); // 1s
  const artistAt = elapsed();
  const albums = await getAlbums("nova"); // + 1.5s
  const albumsAt = elapsed();
  const tracks = await getTopTracks("nova"); // + 2s
  const tracksAt = elapsed();

  return (
    <div className="space-y-6">
      <PageIntro title="Blocking" expected="~4.5s">
        <p>
          Did the click feel frozen? The page stayed on screen until all three
          queries finished one after another: 1s + 1.5s + 2s. Check the
          terminal: each query starts only after the previous one ends.
        </p>
      </PageIntro>
      <div className="grid gap-4 sm:grid-cols-3">
        <ArtistCard artist={artist} readyAt={artistAt} />
        <AlbumsCard albums={albums} readyAt={albumsAt} />
        <TracksCard tracks={tracks} readyAt={tracksAt} />
      </div>
    </div>
  );
}
