// A fake database with slow queries, so the timing of each pattern is easy
// to see. In a real app these would be fetch() calls or ORM queries.
import "server-only";
import { cache } from "react";

export type Artist = { id: string; username: string; name: string; genre: string };
export type Album = { id: string; title: string; year: number };
export type Track = { id: string; title: string; plays: string };
export type Playlist = { id: string; name: string; tracks: number };
export type Post = { id: string; title: string; tag: string };
export type User = { id: string; name: string; queryId: string };

const artist: Artist = {
  id: "a1",
  username: "nova",
  name: "Nova Lane",
  genre: "Synth-pop",
};

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// React.cache memoizes per request: the first call in a request stores the
// time, every later call in the same request gets that same value.
export const getRequestStart = cache(() => performance.now());

export function elapsed() {
  return Math.round(performance.now() - getRequestStart());
}

function log(message: string) {
  console.log(`[db] ${message} at ${elapsed()}ms`);
}

export async function getArtist(username: string): Promise<Artist> {
  log(`getArtist("${username}") started`);
  await sleep(1000);
  return artist;
}

export async function getAlbums(username: string): Promise<Album[]> {
  log(`getAlbums("${username}") started`);
  await sleep(1500);
  return [
    { id: "al1", title: "Neon Tides", year: 2023 },
    { id: "al2", title: "Paper Satellites", year: 2025 },
  ];
}

export async function getTopTracks(username: string): Promise<Track[]> {
  log(`getTopTracks("${username}") started`);
  await sleep(2000);
  return [
    { id: "t1", title: "Glass Hours", plays: "4.2M" },
    { id: "t2", title: "Low Orbit", plays: "3.1M" },
    { id: "t3", title: "Afterglow Club", plays: "1.8M" },
  ];
}

// Needs the artist's id, so it can only start after getArtist() finishes.
export async function getPlaylists(artistId: string): Promise<Playlist[]> {
  log(`getPlaylists("${artistId}") started`);
  await sleep(1500);
  return [
    { id: "p1", name: "Late Night Drive", tracks: 24 },
    { id: "p2", name: "Focus Mode", tracks: 40 },
  ];
}

export async function getPosts(): Promise<Post[]> {
  log("getPosts() started");
  await sleep(1500);
  return [
    { id: "1", title: "Server Components in 5 minutes", tag: "react" },
    { id: "2", title: "Streaming with Suspense", tag: "nextjs" },
    { id: "3", title: "Why fetch in parallel?", tag: "performance" },
    { id: "4", title: "The use() API explained", tag: "react" },
    { id: "5", title: "Skeletons that feel fast", tag: "ux" },
    { id: "6", title: "Caching without surprises", tag: "nextjs" },
  ];
}

// Each call is a separate "query" with its own random id.
async function queryUser(id: string): Promise<User> {
  const queryId = crypto.randomUUID().slice(0, 6);
  log(`queryUser("${id}") started, query ${queryId}`);
  await sleep(300);
  return { id, name: "Sam Lee", queryId };
}

export const getUserUncached = queryUser;

// Same function wrapped in React.cache: within one request, every call with
// the same id shares one query (and one queryId).
export const getUser = cache(queryUser);
