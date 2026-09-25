import { connection } from "next/server";
import { Suspense } from "react";
import { ArtistCard } from "../_components/artist-cards";
import { CardSkeleton, DataCard, List, PageIntro } from "../_components/ui";
import { elapsed, getArtist, getPlaylists, getRequestStart } from "../_lib/db";

// Can't start until it has the artist id, so this wait is unavoidable.
async function Playlists({ artistId }: { artistId: string }) {
  const playlists = await getPlaylists(artistId);

  return (
    <DataCard title="Playlists" readyAt={elapsed()}>
      <List
        items={playlists.map((playlist) => ({
          id: playlist.id,
          label: playlist.name,
          meta: `${playlist.tracks} tracks`,
        }))}
      />
    </DataCard>
  );
}

export default async function Page() {
  await connection();
  getRequestStart();

  // Blocks the whole page for 1s. loading.tsx (next to this file) shows a
  // skeleton during that time, so navigation still feels instant.
  const artist = await getArtist("nova");
  const artistAt = elapsed();

  return (
    <div className="space-y-6">
      <PageIntro title="Sequential" expected="1s, then 2.5s">
        <p>
          Playlists need <code>artist.id</code>, so they can only start after
          the artist arrives. First you saw loading.tsx, then the artist, then
          the playlists streamed in.
        </p>
      </PageIntro>
      <div className="grid gap-4 sm:grid-cols-2">
        <ArtistCard artist={artist} readyAt={artistAt} />
        <Suspense fallback={<CardSkeleton title="Playlists" />}>
          <Playlists artistId={artist.id} />
        </Suspense>
      </div>
    </div>
  );
}
