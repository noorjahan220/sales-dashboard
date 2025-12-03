📊 Sales Dashboard
A responsive React application for visualizing sales performance and transaction history, powered by a custom cursor-based API.

🚀 Key Features
Secure API Integration: Automatically handles authentication via POST /getAuthorize and injects tokens into headers for secure data access.
Advanced Filtering: dynamically reloads data based on Date Range, Minimum Price, Customer Email, and Phone Number.
Revenue Visualization: Features a professional Gradient Area Chart (Recharts) that adapts smoothness and line thickness for mobile devices.
Sales Data Grid:
Displays detailed transaction info with 50 items per page.
Includes interactive Sorting (Asc/Desc) for Date and Price columns.
Smart Pagination:
Uses API before/after cursor tokens.
Implements a custom History Stack to ensure the "Previous" button works reliably even when the API logic falls short.
🛠️ Tech Stack
React.js & Tailwind CSS
TanStack Query (State Management & Caching)
Axios (API Requests)
Recharts (Data Visualization)
📡 API Endpoints
POST /getAuthorize: Fetches the session token.
GET /sales: Loads filtered sales data using query parameters (startDate, priceMin, email, etc.) and pagination cursors.











# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
