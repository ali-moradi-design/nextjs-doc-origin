import type { RequestPreset } from "../_components/request-runner";

const api = "/examples/route-handlers/api";

export const todoPresets: RequestPreset[] = [
  { label: "GET all", method: "GET", url: `${api}/todos` },
  { label: "GET ?done=false", method: "GET", url: `${api}/todos?done=false` },
  {
    label: "POST valid",
    method: "POST",
    url: `${api}/todos`,
    body: { title: "Learn Route Handlers" },
  },
  {
    label: "POST invalid",
    method: "POST",
    url: `${api}/todos`,
    body: { title: "   " },
  },
];

export const todoByIdPresets: RequestPreset[] = [
  {
    label: "PATCH 2 done",
    method: "PATCH",
    url: `${api}/todos/2`,
    body: { done: true },
  },
  { label: "DELETE 3", method: "DELETE", url: `${api}/todos/3` },
  { label: "DELETE 999", method: "DELETE", url: `${api}/todos/999` },
];

export const methodPresets: RequestPreset[] = [
  { label: "PUT (not defined)", method: "PUT", url: `${api}/todos` },
  { label: "OPTIONS", method: "OPTIONS", url: `${api}/todos` },
  { label: "HEAD", method: "HEAD", url: `${api}/todos` },
];

export const cachePresets: RequestPreset[] = [
  { label: "GET force-static", method: "GET", url: `${api}/time/static` },
  { label: "GET default", method: "GET", url: `${api}/time/dynamic` },
];

export const requestInfoPresets: RequestPreset[] = [
  {
    label: "GET with query",
    method: "GET",
    url: `${api}/request-info?lang=fa&page=2`,
  },
];

export const redirectPresets: RequestPreset[] = [
  { label: "GET ?to=time", method: "GET", url: `${api}/go?to=time` },
  { label: "GET ?to=todos", method: "GET", url: `${api}/go?to=todos` },
];

export const exportPresets: RequestPreset[] = [
  { label: "GET CSV", method: "GET", url: `${api}/export` },
];
