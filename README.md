# Multiscale Modeling of Materials Lab Website

Static React + TypeScript + Vite website for Dr. Wenwu Xu's Multiscale Modeling of Materials Lab at San Diego State University.

## Run Locally

```powershell
npm install
npm run dev
```

Production-style preview:

```powershell
npm run build
npm run preview
```

## Content Editing

Most frequently updated content is file-backed:

- `src/content/people/*.md`: PI, graduate students, undergraduate researchers, alumni, and former members.
- `src/content/projects/*.md`: research project cards and featured project details.
- `src/content/news/*.md`: news posts, sorted by date automatically.
- `src/data/publications.yaml`: selected publications and theme filters.
- `src/data/funding.yaml`: sponsors and funding notes.
- `src/data/collaborators.yaml`: collaborators, facilities, and profile links.

Sections with no content are hidden automatically. Images are registered in `src/App.tsx` so content files can refer to short image keys such as `materials-hero`, `research-modeling`, or `team/wenwu-xu`.

## Quality Checks

```powershell
npm run lint
npm run build
```

The site deploys as a static website from the generated `dist/` folder.
