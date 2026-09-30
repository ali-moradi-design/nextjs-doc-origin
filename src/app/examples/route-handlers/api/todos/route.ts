import { type NextRequest } from "next/server";
import * as z from "zod";
import { readJson } from "../../_lib/read-json";
import { addTodo, listTodos, newTodoSchema } from "../../_lib/todos";

// GET /examples/route-handlers/api/todos?done=true
// Not cached: it runs on every request (the default for Route Handlers).
export async function GET(request: NextRequest) {
  const done = request.nextUrl.searchParams.get("done");
  const todos = listTodos(done === null ? undefined : done === "true");
  return Response.json(todos);
}

// POST /examples/route-handlers/api/todos  with a JSON body { title }
export async function POST(request: Request) {
  const result = newTodoSchema.safeParse(await readJson(request));
  if (!result.success) {
    return Response.json(z.flattenError(result.error), { status: 400 });
  }

  const todo = addTodo(result.data.title);
  return Response.json(todo, {
    status: 201,
    headers: { Location: `/examples/route-handlers/api/todos/${todo.id}` },
  });
}
