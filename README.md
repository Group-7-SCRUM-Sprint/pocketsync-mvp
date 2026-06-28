# PocketSync

A consolidated personal finance management platform built as a React + TypeScript MVP. PocketSync helps users connect mock Nigerian banking and fintech accounts, view balances, and track recent activity from a single dashboard.

## Project Structure

- `frontend/` — main Vite React application
- `frontend/src/` — application source code
- `frontend/src/components/` — reusable UI components
- `frontend/src/pages/` — route-level page components
- `frontend/src/data/` — mock account and transaction data
- `frontend/src/assets/` — brand and bank logo assets

## What it does

- User registration creates a fresh account with an empty dashboard state
- Login loads existing per-user data and preserves previously linked accounts and transactions
- Mock bank account linking uses actual asset logos from `src/assets/banks`
- Dashboard displays balances, recent activity, and a mobile-friendly bottom nav
- Responsive mobile UX with improved touch targets and scrolling behavior
- Route changes reset scroll position automatically

## Key features

- Email-based login with preserved per-user storage
- Registration with empty user state until accounts are linked
- Mock bank account linking and transaction creation
- Bank logo matching using file-based bank asset names
- Mobile-first navigation and improved input usability

## Supported mock institutions

- GTBank
- Access Bank
- Kuda
- Opay
- Moniepoint
- PalmPay
- Additional banks are supported via asset matching in `frontend/src/assets/banks`

## Tech Stack

- React 19
- TypeScript 6
- Vite
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- React Query

## Setup

```bash
cd frontend
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Available scripts

From `frontend/`:

- `npm run dev` — start the development server
- `npm run build` — build the production app
- `npm run lint` — run ESLint
- `npm run preview` — preview the production build locally

## Notes

- Data is stored locally in the browser using `localStorage` for each email-based user.
- Registered users start with an empty dashboard; logging in with an existing email restores previously added mock accounts and transactions.
- The app is an MVP prototype and uses mock/demo data only.

## License

Educational and demonstration purposes only.
