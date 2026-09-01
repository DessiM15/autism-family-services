# Autism Family Services of Beaumont

A rebuild of [autismbmt.org](https://www.autismbmt.org) — Beaumont's first and only
Certified Autism Center.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Motion · Lenis

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

---

## What's here

| Route | Page |
| --- | --- |
| `/[locale]` | Home — scroll-driven photo montage hero |
| `/[locale]/start-here` | Three-question router to the right service |
| `/[locale]/services` | All 15 services with published rates + insurance |
| `/[locale]/aba` | "Uses for ABA" — the 27 naturalistic methods |
| `/[locale]/team` | Meet the Team — six cinematic scroll profiles |
| `/[locale]/about` | Story, values, Certified Autism Center, SHAPE |
| `/[locale]/first-visit` | Seven-step visual walkthrough + sensory notes |
| `/[locale]/resources` | Hub linking the grant finder, first visit, ABA and events |
| `/[locale]/grants` | Filterable finder across 21 funding programs |
| `/[locale]/careers` | Three open roles + application form |
| `/[locale]/gen-xy` | Gen XY Counseling Center |
| `/[locale]/whats-happening` | Programs, SHAPE, ADHD training |
| `/[locale]/events` | Recurring workshops and groups |
| `/[locale]/contact` | Callback request + map |
| `/[locale]/staff` | Code-gated internal SHAPE links (`noindex`) |

`locale` is `en` or `es`. Every page exists in both.

---

## The four things worth knowing

### 1. Calm Mode
A visible switch in the header that stills the entire site — no parallax, no
reveals, no montage. It auto-enables for `prefers-reduced-motion` and is
remembered in `localStorage`.

One CSS custom property (`--motion-scale`) and one hook (`useMotionAllowed`)
drive it. **Any new animated component must call `useMotionAllowed()` and render
its finished state when the answer is `false`** — never a blank or half-animated
one. `src/components/calm/CalmModeProvider.tsx` also ships an inline
`calmModeScript` that runs before first paint, so a visitor who asked for
stillness never sees the page move.

### 2. Language
- `src/proxy.ts` detects `Accept-Language` and redirects `/` → `/en` or `/es`.
- **Detection never writes a cookie.** Only the EN|ES toggle does. A detected
  language must not harden into a remembered "choice" — otherwise one visit on a
  shared computer, or through a VPN, locks the next person into the wrong one.
- All copy lives in `src/content/dictionaries/{en,es}.ts`. `en` is the source of
  truth and is typed `as const`; `es` must match its shape exactly.
- Old Wix paths (`/team-4`, `/about-5`, …) 308-redirect to their new homes, so
  nothing breaks when this takes over the domain.

### 3. Photography
All 37 photographs are **CC0** (public domain, no attribution required),
sourced via the Openverse API. They are illustrative and do not depict clients —
the footer says so.

Everything routes through `src/components/ui/Img.tsx`, which reads dimensions,
bilingual alt text and a blur-up placeholder from
`src/content/data/images.json`. **To swap in the clinic's real photography,
replace the file in `public/images/` and update that one manifest entry** — no
component changes. `scripts/` has no image tooling checked in; regenerate the
manifest by hand or re-run the curation from the session notes.

### 4. House style: no em dashes
Visible copy contains no em dashes. They were removed deliberately (the client
finds them a tell), and sentences were restructured rather than having the
punctuation swapped. The chatbot's system prompt carries the same rule, so
generated replies match. **One exception is intentional**: Jennifer's bio on
the team page keeps hers, because that copy is verbatim and the client chose
to preserve it exactly.

### 5. Voice
Visitors can talk to the assistant and hear it answer. Four things about it
are deliberate:

- **The microphone is never opened without an explanation first.** The first
  tap shows what will happen and a plain-language privacy note, because
  people speak far more freely than they type and browser speech recognition
  sends the audio to Google or Apple to transcribe.
- **Four seconds of silence ends the turn** and sends what was heard. That
  endpointing is what makes it feel like a conversation rather than a form.
- **Calm Mode keeps voice but never auto-speaks.** Voice is the accessible
  option for some people, so it stays; audio starting by itself is exactly
  what that switch exists to prevent, so each reply gets a play button and
  the waveform goes still.
- **The waveform is real.** It reads actual microphone amplitude through a
  Web Audio analyser, so it doubles as proof the mic is working.

Firefox has no `SpeechRecognition`, so the microphone button hides itself
there and typing carries on as normal.

**Trap worth knowing:** the `Permissions-Policy` header in `next.config.ts`
must keep `microphone=(self)`. It was `microphone=()` at first, which silently
disabled the whole feature with only a console warning to show for it.

### 6. Typography utilities
Custom type utilities are named `type-display-lg`, `type-lead`, `type-eyebrow`
— **not** `text-*`. `tailwind-merge` treats every `text-*` class as the
font-size/colour group and will silently drop `text-display-lg` when it sits
beside `text-navy-900`. Keep new type utilities out of the `text-` namespace.

---

## Environment

Copy `.env.example` to `.env.local`. Everything is optional — the site runs
fully without any of it.

| Variable | Effect when unset |
| --- | --- |
| `ANTHROPIC_API_KEY` | Chatbot falls back to a built-in keyword responder covering rates, insurance, diagnostics, location, services, grants, careers and ABA. Fully demonstrable. |
| `ELEVENLABS_API_KEY` | The assistant still speaks, using the best voice on the visitor's own device. `/api/speech` returns 204 and the client falls back automatically. |
| `ELEVENLABS_VOICE_ID_EN` / `_ES` / `ELEVENLABS_MODEL` | Sensible defaults are used. |
| `CHAT_MODEL` | Defaults to `claude-opus-5`. |
| `CONTACT_FORWARD_URL` | Callback requests are logged server-side instead of forwarded. |
| `CONTACT_FORWARD_TOKEN` | No `Authorization` header on the forward. |
| `STAFF_ACCESS_CODE` | Staff portal code defaults to `shape`. |

---

## Two rules that are not style preferences

**Public forms must never collect protected health information.** The callback
form takes a name, phone, email, best time to call and a non-clinical note, and
it explicitly tells people not to share medical details. The moment a public
form asks about a diagnosis it is collecting PHI and brings HIPAA obligations a
marketing site should not carry. Clinical intake happens on the phone.

**The chatbot is a front door, not a clinician.** Its system prompt
(`src/content/data/chat-knowledge.ts`) forbids diagnosing, assessing symptoms,
giving medical advice, or naming accepted insurance plans, and routes anyone
describing a crisis to 911 and the 988 Lifeline. It quotes only rates that
appear on the services page. Those rules are load-bearing — don't relax them to
make it chattier.

---

## Still needed from the clinic

- **Accepted insurance plans.** The single most-asked question, and it is
  nowhere on the current site. `t.servicesPage.insurancePlaceholder` holds the
  spot. *Being collected at the client presentation.*
- **Real clinic photography** — the building, waiting area, therapy rooms and
  the sensory space. The First Visit walkthrough is built for it and is
  dramatically stronger with real rooms. Note that Google Street View imagery
  is © Google and is not licensed for use here; photos on the clinic's own
  Google Business Profile are only usable if the clinic uploaded them. A
  fifteen-minute phone walk-round by staff is the right source.
- **Where callback submissions should go.** `deliver()` in
  `src/app/api/contact/route.ts` is the single seam — point
  `CONTACT_FORWARD_URL` at whatever system ends up handling intake.
- A refresh of the grants list — their own copy notes it hasn't been updated
  since 2017. It is reproduced verbatim, disclaimer included.

**Resolved:** the clinic *does* have Spanish-speaking staff. "Se habla
español" now appears in the announcement strip, the hero, the mobile menu and
the footer (always rendered in Spanish, `lang="es"`, on both locales — it is
addressed to Spanish speakers scanning for it), there is a callout beside the
phone number on the Contact page, and the chatbot answers the question
directly in both languages. It deliberately never names an individual, since
it cannot know who is rostered.

---

## Content provenance

Every sentence from the current site is reproduced **verbatim**: mission,
values, the Ecclesiastes 3:1 verse, the Certified Autism Center explainer, the
ABA approach, all six team bios, all 15 services and rates, all 21 grant
descriptions, careers copy and testimonials. New writing is limited to
connective tissue — section headers, CTA microcopy, alt text and meta
descriptions.
