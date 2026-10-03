# Task Board

![Task Board screenshot](screenshots/preview.jpg
)

A small Kanban-style task manager built with **React 18** and **Vite**.

## Features

- Add, move (To do → In progress → Done) and delete tasks
- Live search / filtering with `useMemo`
- Data saved in the browser with a custom `useLocalStorage` hook
- Responsive layout (CSS Grid), dark theme, no UI library

## Tech

React hooks (`useState`, `useMemo`, `useEffect`), custom hooks, Vite, plain CSS.

## Run locally

```bash
npm install
npm run dev
```

Build for production: `npm run build`

## Ideas to extend (great for showing growth)

- Drag and drop between columns
- Due dates and priority labels
- Unit tests with Vitest + React Testing Library
- TypeScript migration

## Author

Zahra Haghjo · [LinkedIn](https://www.linkedin.com/in/zahrahaghjo) · [GitHub](https://github.com/ZahraHaghjo)
