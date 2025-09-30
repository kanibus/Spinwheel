# Silverside Challenge Wheel

A gamified creative prompt generator tailored for the Silverside team. Spin a vibrant wheel to blend preloaded inspiration, AI-flavored word expansions, and custom team inputs into a mini creative brief that can kick-start short-form campaigns, social content, or brainstorm sessions.

## Getting started

```bash
npm install
npm run dev
```

The app starts on http://localhost:5173 and features:

- **Spin wheel mechanic** that animates with each spin and displays the most recent category selections.
- **AI-flavored idea suggestions** so teams can expand each category beyond the default word banks with one click.
- **ChatGPT-powered phrase builder** that can turn every spin into a bespoke creative challenge when an OpenAI key is provided, with a graceful local fallback.
- **Custom word management** with add, clear, and remove controls per category.
- **Challenge library** to save, timestamp, and copy the strongest ideas.
- **Spin history** so the group can revisit recent pulls during a session.

### Optional ChatGPT integration

The wheel can ask ChatGPT to stitch the selected words into a vivid challenge sentence. Provide an API key via environment variables before running the app:

```bash
export VITE_OPENAI_API_KEY="sk-..."
# optional overrides
export VITE_OPENAI_MODEL="gpt-4o-mini"
export VITE_OPENAI_API_URL="https://api.openai.com/v1/chat/completions"
```

With the key present you can toggle the **ChatGPT phrase builder** switch above the spin button. If the API is unreachable the app automatically falls back to local phrase templates and surfaces the error in the UI.

## Scripts

- `npm run dev` – start the Vite dev server.
- `npm run build` – type-check and build the production bundle.
- `npm run preview` – preview the production build locally.
- `npm run lint` – run ESLint against the codebase.
- `npm run format` – format the project using Prettier.
