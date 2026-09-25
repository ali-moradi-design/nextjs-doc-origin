import type { Album, Artist, Track } from "../_lib/db";
import { DataCard, List } from "./ui";

export function ArtistCard({ artist, readyAt }: { artist: Artist; readyAt: number }) {
  return (
    <DataCard title="Artist" readyAt={readyAt}>
      <p className="text-2xl font-semibold">{artist.name}</p>
      <p className="text-sm text-zinc-500">
        @{artist.username} · {artist.genre}
      </p>
    </DataCard>
  );
}

export function AlbumsCard({ albums, readyAt }: { albums: Album[]; readyAt: number }) {
  return (
    <DataCard title="Albums" readyAt={readyAt}>
      <List
        items={albums.map((album) => ({
          id: album.id,
          label: album.title,
          meta: String(album.year),
        }))}
      />
    </DataCard>
  );
}

export function TracksCard({ tracks, readyAt }: { tracks: Track[]; readyAt: number }) {
  return (
    <DataCard title="Top tracks" readyAt={readyAt}>
      <List
        items={tracks.map((track) => ({
          id: track.id,
          label: track.title,
          meta: track.plays,
        }))}
      />
    </DataCard>
  );
}
