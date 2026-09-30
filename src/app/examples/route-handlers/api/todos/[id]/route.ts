import * as z from "zod";
import { readJson } from "../../../_lib/read-json";
import { removeTodo, todoPatchSchema, updateTodo } from "../../../_lib/todos";

type Context = RouteContext<"/examples/route-handlers/api/todos/[id]">;

const notFound = () => Response.json({ error: "Not found" }, { status: 404 });

// PATCH /examples/route-handlers/api/todos/2  with { done: true }
export async function PATCH(request: Request, ctx: Context) {
  const { id } = await ctx.params;
  const result = todoPatchSchema.safeParse(await readJson(request));
  if (!result.success) {
    return Response.json(z.flattenError(result.error), { status: 400 });
  }

  const todo = updateTodo(Number(id), result.data);
  return todo ? Response.json(todo) : notFound();
}

// DELETE /examples/route-handlers/api/todos/2
export async function DELETE(_request: Request, ctx: Context) {
  const { id } = await ctx.params;
  const todo = removeTodo(Number(id));
  // 204 No Content: success without a body.
  return todo ? new Response(null, { status: 204 }) : notFound();
}
