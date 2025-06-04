# 🌐 CodeBinX

**The modern way to share, store, and collaborate on code snippets, powered by modern tech, built for developers, by a developer.**

CodeBinX is a full-stack open-source alternative to Pastebin/Sourcebin with authentication, bin management, private sharing, syntax highlighting, and a beautiful UI. Built using modern technologies like TypeScript, Next.js, MongoDB, and Monaco Editor.


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



## 🔧 Roadmap Highlights

* [x] Bin creation and syntax highlighting
* [x] Google login + local auth
* [x] Password-protected bins
* [x] User dashboards
* [x] Expiration logic and cleanup
* [ ] Docker installing
* [ ] CLI Commands to make everything easier
* [ ] Real-time editing
* [ ] Comments and reactions on bins
* [ ] Bin forking and templates
* [ ] Public user profiles



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
* 🐙 GitHub: [@dewstouh](https://github.com/dewstouh)
* 📩 Email: [support@elmundodeniby.com](mailto:support@elmundodeniby.com)
* 💬 Discord: [Join community](https://discord.gg/codebinx)



## 📄 License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file.


**Built with rage, love, and TypeScript by Diego Rodríguez.**
[codebinx.elmundodeniby.com](https://codebinx.elmundodeniby.com)


