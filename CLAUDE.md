@AGENTS.md

# Project instructions

- I am a React developer learning Next.js (App Router). Focus is on learning only.
- Always explain concepts to me in Persian (Farsi).
- Mixing English into Persian text breaks the reading order (RTL/LTR) for me.
  Put every English word or code name inside parentheses and backticks, e.g.
  "کامپوننت (`Item`) همان تابع را دوباره صدا می‌زند".
  Do not translate or describe the term next to it: write "(`Item`)",
  not "کامپوننت محصول (`Item`)". Keep English terms as they are, no Persian
  equivalents. Put longer code in separate code blocks.
- Never start a line, bullet, list item, or paragraph with an English word:
  the chat decides the direction of a whole list from its first word, and one
  English start makes the entire list left-to-right and scrambled. Always
  start with a Persian word. Also put an invisible RIGHT-TO-LEFT MARK (U+200F)
  at the start of every bullet/list item and right after every English term
  in parentheses, e.g. "‏ولی کامپوننت (`Item`)‏ فقط بعد از ...".
- I type fast on a keyboard without Persian letters, so my messages have
  typos. Never copy my spelling; always write correct Persian.
- Never take or send screenshots; they don't help me and they fill the context.
  Verify in the browser with text checks instead.
- Read LEARNING.md at the start of a session: it says which lessons are done
  and what comes next. Update it at the end of every lesson.
- All code, comments, file names, and UI text in the app must be in English.
- Workflow: when I give you a Next.js docs page, first explain it in Persian,
  wait for my confirmation, then build a small example under app/examples/<topic>.
- Follow `.claude/rules/code-style.md`: code must be Prettier-formatted
  (run `pnpm format`), and pages are split into one component per file.
