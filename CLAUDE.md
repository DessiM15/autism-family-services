# Working in this repo

Read `README.md` first — the four numbered sections there cover the
non-obvious mechanics (Calm Mode, language detection, the image manifest, and
the typography-utility naming trap).

Three things that will bite you if you skip them:

1. **Custom type utilities are `type-*`, never `text-*`.** `tailwind-merge`
   reads every `text-*` class as the font-size/colour group and silently drops
   `text-display-lg` when it sits next to `text-navy-900`.

2. **Anything that animates must call `useMotionAllowed()`** and render its
   finished state when it returns `false`. Calm Mode is a promise this
   organisation makes to its clients, not a nice-to-have.

   Two traps this cost us once already, both live in `src/components/motion/`:
   - `useMotionAllowed()` is `false` until hydration, so a component that
     early-returns a plain tag **before** its motion element mounts will run
     `useInView` against a ref that never attaches — the observer watches
     nothing and the element stays hidden forever. Always split into a
     decision component and an animated body (see `Reveal`, `Parallax`,
     `Hero`).
   - Never let a hidden state collapse the element you are observing.
     Chrome's IntersectionObserver reports zero intersection for a
     `clip-path`-collapsed element, so it can never come into view. The mask
     reveal observes an unclipped wrapper and animates a child.

3. **Never add health questions to a public form**, and never let the chatbot
   diagnose, assess symptoms, or state which insurance is accepted. See the
   "two rules" section of the README.

4. **The `Permissions-Policy` header must keep `microphone=(self)`.** Setting
   it to `microphone=()` disables the chat assistant's voice input across the
   whole site, and the only symptom is a console warning.

Copy from the current site is verbatim. Don't reword `t.home.missionP1`, the
values list, the CAC explainer, the ABA copy, the team bios, the service names
and rates, or the grant descriptions.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
