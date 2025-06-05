<p align="center">
  <a href="https://github.com/dewstouh/CodeBinX">
    <img alt="License" src="https://img.shields.io/github/license/dewstouh/CodeBinX" />
  </a>
  <a href="https://github.com/dewstouh/CodeBinX">
    <img alt="Last Commit" src="https://img.shields.io/github/last-commit/dewstouh/CodeBinX" />
  </a>
  <a href="https://github.com/dewstouh/CodeBinX/issues">
    <img alt="Issues" src="https://img.shields.io/github/issues/dewstouh/CodeBinX" />
  </a>
  <a href="https://github.com/dewstouh/CodeBinX/stargazers">
    <img alt="Stars" src="https://img.shields.io/github/stars/dewstouh/CodeBinX?style=social" />
  </a>
</p>

# 🌐 CodeBinX

**CodeBinX is the all-in-one solution to create, protect, and manage code snippets.**

Forget outdated pastebins. CodeBinX offers full-stack snippet management with syntax highlighting, authentication, private bins, user dashboards, and full API support — all in one.

🔗 [Live Demo](https://codebinx.elmundodeniby.com)


## 📦 Monorepo Structure

This repository uses a monorepo layout to organize the frontend, backend, and shared logic.

```
codebinx/
├── backend/       # Express + MongoDB REST API
├── frontend/      # Next.js + Tailwind CSS client app
├── shared/        # Shared types/interfaces/utilities
├── package.json   # Root package.json with workspaces
├── tsconfig.json  # Root TS config for project references
└── README.md      # This file
```



## 🧠 Tech Stack Overview

### 💻 Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Auth:** Passport.js + JWT + Google OAuth
- **Validation:** express-validator
- **Other:** bcryptjs, nanoid, node-cron, dotenv, helmet, morgan

### 🌍 Frontend

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, clsx, tailwind-merge
- **Editor:** Monaco Editor
- **Animations:** Framer Motion
- **UI Components:** Radix UI, lucide-react
- **Auth:** Google OAuth + JWT client handling

### 🔄 Shared

- **@codebinx/shared**: Shared types and interfaces between backend and frontend using workspaces


## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/dewstouh/codebinx.git
cd codebinx
```

### 🧩 Install Dependencies

```bash
pnpm install
# or
yarn install
# or
npm install
```

> Uses **workspaces**, so installing in root installs all (`frontend`, `backend`, `shared`) at once.



## 🧪 Development Workflow

### 1. Start the Backend

```bash
cd backend
pnpm dev
```

Make sure MongoDB is running locally or use MongoDB Atlas.

### 2. Start the Frontend

```bash
cd ../frontend
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

### 3. Environment Setup

Create `.env` files in:

* `/backend/` → for backend config
* `/frontend/` → at least `NEXT_PUBLIC_API_URL=http://localhost:3001`



## 📜 Scripts

From the root, you can run:

```bash
pnpm build:all     # Builds backend + frontend + shared
pnpm dev:backend   # Starts backend dev server
pnpm dev:frontend  # Starts frontend dev server
pnpm lint          # Runs lint across all packages
```

Custom workspace scripts defined in each package.



## 🧱 Architecture Principles

- **Modular Design:** Clear separation of frontend/backend/shared
- **Scalable:** Ready for real-world usage and deployment
- **Typed:** Full TypeScript coverage across the stack
- **Reusable:** Shared logic through internal workspace `@codebinx/shared`



## 🚀 Deployment

* Backend can be deployed to any Node.js-compatible server (Render, Railway, Heroku, etc.)
* Frontend is optimized for Vercel (supports App Router, dynamic routes, etc.)

> Environment variables must be configured properly in both environments.



## 📄 Documentation

* [Backend README](./backend/README.md)
* [Frontend README](./frontend/README.md)
* [API Docs (soon)](https://codebinx.elmundodeniby.com/docs)



## 🔧 Roadmap

- ✅ Bin creation with syntax highlighting (Core)
- ✅ Auth system: Google OAuth & local login (Security)
- ✅ Password-protected bins (Privacy)
- ✅ User dashboards with bin stats (UX)
- ✅ Bin expiration & automatic cleanup (Maintenance)
- 🔜 Docker support (DevOps)
- 🔜 CLI tool for bin management (DX)
- 🔜 Real-time collaborative editing (Advanced Feature)
- 🔜 Comments & reactions (Community)
- 🔜 Bin templates and forking (Productivity)
- 🔜 Public user profiles with social bins (Engagement)



## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/awesome`
3. Commit your changes: `git commit -m 'feat: add awesome feature'`
4. Push to the branch: `git push origin feature/awesome`
5. Open a Pull Request

> Follow code style from each workspace. Type-safe. Tested. Documented.



## 📬 Contact

* 🌐 Website: [elmundodeniby.com](https://elmundodeniby.com)
* 🔵 LinkedIn: [linkedin.com/in/bydiego](https://linkedin.com/in/bydiego)
* 🐙 GitHub: [@dewstouh](https://github.com/dewstouh)
* 📩 Email: [support@elmundodeniby.com](mailto:support@elmundodeniby.com)
* 💬 Discord: [Join community](https://discord.gg/codebinx)



## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file.


by [Diego Rodríguez](https://github.com/dewstouh) — [justdiego.com](https://justdiego.com)


