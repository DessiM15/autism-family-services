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

3. **Never add health questions to a public form**, and never let the chatbot
   diagnose, assess symptoms, or state which insurance is accepted. See the
   "two rules" section of the README.

Copy from the current site is verbatim. Don't reword `t.home.missionP1`, the
values list, the CAC explainer, the ABA copy, the team bios, the service names
and rates, or the grant descriptions.
