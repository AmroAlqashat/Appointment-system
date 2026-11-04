# Next.js frontend starter

A minimal Next.js App Router + React + TypeScript setup. No authentication, API integration, or appointment features are implemented.

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3001. Port 3001 leaves port 3000 available for the original NestJS backend.

Start with `app/page.tsx`, `app/layout.tsx`, and `app/globals.css`.

```bash
npm run build
npm start
```

The root TypeScript configurations exclude `frontend/` so NestJS and Next.js compile independently.
