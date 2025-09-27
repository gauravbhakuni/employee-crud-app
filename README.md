# Employee CRUD App

A full-stack Employee Management application built with **Next.js (App Router)** and **SQLite**.  
It supports full CRUD operations (Create, Read, Update, Delete), employee filtering, and a responsive UI with light/dark theme powered by Tailwind CSS.

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

You can start editing the app by modifying files under `src/app/` (for example `src/app/employees/page.tsx`). The page auto-updates as you edit.

---

## 🧪 Run Tests (backend)

If you're using the test DB setup from the project, run tests like this:

```bash
# run Jest with test env (uses separate test DB if configured)
NODE_ENV=test npx jest
# or if you add a package.json script:
npm test
```

---

## 🛠 Features

- 📋 Manage employees with full CRUD functionality  
- 🔎 Search & filter employees (client-side)  
- 🌗 Dark and light theme support (CSS variables + prefers-color-scheme)  
- ⚡ Local persistence with SQLite (`better-sqlite3`)  
- ✅ Backend tests using Jest

---

## 🧭 Project Structure (high level)

```text
src/
├─ app/
│  ├─ api/
│  │  ├─ employees/route.ts        # GET, POST
│  │  └─ employees/[id]/route.ts   # GET, PUT, DELETE
│  ├─ employees/page.tsx           # Frontend list + form UI
│  └─ layout.tsx
├─ lib/
│  ├─ employeeDb.ts                # DB helpers (imported by API & tests)
│  └─ types.ts
tests/
├─ employee.test.ts                # Jest tests for CRUD
db.sqlite                          # production DB (do not commit)
src/lib/db.test.sqlite             # test DB (ignored)
```

---

## ⚙️ Notes & Recommendations

- **Do not commit** `db.sqlite` to the repository. Add it to `.gitignore`.  
- The test runner uses `NODE_ENV=test` to switch to a separate test DB (`src/lib/db.test.sqlite`) if you configured `employeeDb.ts` that way.  
- For styling, semantic tokens like `--color-card`, `--color-primary`, etc. are defined in `globals.css` — adjust there to change theme colors.  
- To force dark mode by default via CSS only, set dark variables in `:root` and provide light overrides inside `@media (prefers-color-scheme: light)` (see `globals.css` in the project).

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)  
- [Tailwind CSS](https://tailwindcss.com/docs)  
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)  
- [Jest](https://jestjs.io/) and [Supertest](https://github.com/visionmedia/supertest) for testing APIs

---

## 🚢 Deployment

The easiest way to deploy this app is with [Vercel](https://vercel.com).  
Check out the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---
