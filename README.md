# MDSL Digital Keepsake

A client-side React keepsake app migrated to a standalone local development
stack.

## Stack

- React 18
- TypeScript 5
- Vite 5
- Tailwind CSS 3
- shadcn/ui primitives
- React Router DOM
- TanStack Query
- Lucide React
- Sonner
- Vitest + jsdom

## Local development

```bash
npm install
npm run dev
```

Open the URL shown by Vite, usually `http://localhost:5173`.

## Other commands

```bash
npm run typecheck
npm run build
npm run test
npm run preview
```

The app is currently client-side only. The keepsake code and content live in
`src/App.tsx`, making it easy to duplicate the content object for another
recipient before a backend is introduced.