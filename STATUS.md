# Status

## Current State

- Modern academic lab redesign is implemented.
- Navigation includes Home, Research, Publications, People, News, Join Us, Teaching & Outreach, and Contact.
- People, projects, news, publications, funding, and collaborators are driven by Markdown/YAML files.
- Research and publication theme filters are working.
- Latest news and featured publications populate automatically from content files.
- Local preview runs at `http://127.0.0.1:4173/`.
- Lint and production build pass.

## Important Paths

- App shell and renderer: `src/App.tsx`
- Main styles: `src/App.css`
- Global theme: `src/index.css`
- People content: `src/content/people/`
- Project content: `src/content/projects/`
- News content: `src/content/news/`
- Publications and partner data: `src/data/`
- Images: `src/assets/`
- Build output: `dist/`

## Latest Verification

- `npm run lint`
- `npm run build`
- In-app browser preview at `http://127.0.0.1:4173/`
