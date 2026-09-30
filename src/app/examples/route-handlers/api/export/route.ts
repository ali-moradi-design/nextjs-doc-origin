import { listTodos } from "../../_lib/todos";

// A non-JSON response: a CSV file the browser downloads because of the
// Content-Disposition header.
export async function GET() {
  const rows = listTodos().map(
    (todo) => `${todo.id},"${todo.title.replaceAll('"', '""')}",${todo.done}`,
  );
  const csv = ["id,title,done", ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="todos.csv"',
    },
  });
}
