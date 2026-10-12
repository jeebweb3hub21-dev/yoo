# A question for you

A small one-page surprise: a few yes-or-no questions, one slide at a time. **Yes** moves forward. **No** slips away, shrinking as it goes, while **Yes** grows until it covers **No**.

## Run it locally

From the `frontend` folder:

```bash
npm install
npm run dev
```

Open the address Vite prints (usually http://localhost:5173).

## Change the questions

Edit the list in [`src/questions/index.js`](src/questions/index.js). Each item has:

- `id` — a unique name, used as the slide key
- `eyebrow` — the small line above the question
- `prompt` — the question itself
- `Component` — the React component for that slide

Reorder or remove items in that array and the slides follow. The last question should be the one you want her to finish on. After she presses **Yes** on it, the closing note in [`src/components/Celebration.jsx`](src/components/Celebration.jsx) appears.

Each question has its own file in `src/questions/`. They all render the shared slide, so the Yes / No behavior stays the same if you add another question. To add one:

1. Copy a file such as `src/questions/LikeMeQuestion.jsx` and rename the function.
2. Add an entry to the array in `src/questions/index.js`.

## Build for a static host

```bash
npm run build
```

Upload the `dist` folder to any static host. `npm run preview` serves that build locally.
