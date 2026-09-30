import "server-only";
import * as z from "zod";

export type Todo = { id: number; title: string; done: boolean };

// A fake database in server memory. It resets when the server restarts
// (and, in `next dev`, sometimes when this file is recompiled).
const todos: Todo[] = [
  { id: 1, title: "Read the Route Handlers docs", done: true },
  { id: 2, title: "Write a GET handler", done: false },
  { id: 3, title: "Write a POST handler", done: false },
];
let nextId = 4;

export const newTodoSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(80),
});

export const todoPatchSchema = z.object({
  title: z.string().trim().min(1).max(80).optional(),
  done: z.boolean().optional(),
});

export function listTodos(done?: boolean) {
  return done === undefined
    ? todos
    : todos.filter((todo) => todo.done === done);
}

export function addTodo(title: string) {
  const todo = { id: nextId++, title, done: false };
  todos.push(todo);
  return todo;
}

export function updateTodo(id: number, patch: Partial<Omit<Todo, "id">>) {
  const todo = todos.find((item) => item.id === id);
  if (todo) Object.assign(todo, patch);
  return todo;
}

export function removeTodo(id: number) {
  const index = todos.findIndex((item) => item.id === id);
  if (index === -1) return undefined;
  return todos.splice(index, 1)[0];
}
