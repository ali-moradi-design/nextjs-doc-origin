import "server-only";

// What the fake Google Analytics received: an in-memory "Realtime report".
export type GoogleHit = {
  name: string;
  page: string;
  title: string;
  clientId: string;
  measurementId: string;
  params: Record<string, string | number>;
  receivedAt: number;
};

const hits: GoogleHit[] = [];
const MAX_HITS = 50;

export function saveHit(hit: GoogleHit) {
  hits.push(hit);
  if (hits.length > MAX_HITS) hits.shift();
}

export function listHits() {
  return hits;
}
