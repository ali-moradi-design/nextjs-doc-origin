# Code style

## Formatting: Prettier

- The project uses Prettier (`.prettierrc.json`) with
  `prettier-plugin-tailwindcss`, which sorts Tailwind classes.
- The user formats on save in VS Code. Write code that Prettier would leave
  unchanged: double quotes, semicolons, trailing commas, 80-column lines,
  Tailwind classes in the plugin's order.
- After writing or editing files, always run `pnpm format` (or
  `pnpm prettier --write <files>`) and then `pnpm format:check` before
  committing.

## File structure: one component per file

Split pages the way a real project would. A `page.tsx` only composes the
page; it does not define helper components.

```
src/app/examples/<topic>/
  page.tsx                 # composes sections, no helper components
  _components/
    ui/                    # generic building blocks: card.tsx, section.tsx, skeleton.tsx
    <feature>.tsx          # one feature component per file, kebab-case name
  _lib/
    data.ts                # data access, fake db, server-only helpers
    constants.ts           # shared constants and types, when needed
```

- One exported component per file. Small private helpers used by only that
  component may stay in the same file.
- File names are kebab-case; component names are PascalCase
  (`cached-products.tsx` exports `CachedProducts`).
- Use named exports for components; `page.tsx` and `layout.tsx` keep their
  required default export.
- Components used by several examples go in `src/app/_components`.
- Keep `"use client"` files small and leaf-level; keep everything else a
  Server Component.
- Put types next to the code that owns them (e.g. `Product` in
  `_lib/data.ts`) and import them with `import type` or inline `type`.
