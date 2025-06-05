# CodeBinX - Frontend

**The modern way to share, store, and collaborate on code snippets.**

This is the frontend server for CodeBinX, a modern alternative to Pastebin/Sourcebin. It provides a nice design page to create and share custom bins.


![CodeBinX Demo](https://via.placeholder.com/800x400/1f2937/ffffff?text=CodeBinX+Demo)

## ✨ Features

### 🎨 **Code Editor With Monaco Integration**
- Monaco Editor integration with VS Code-like experience
- Syntax highlighting for 20+ programming languages
- Dark theme with customizable settings
- Line numbers and bracket matching

### 🔒 **Privacy & Security**
- Public and private bins
- Password protection for sensitive code
- Expiration dates (1 day to never)
- Secure authentication with JWT

### 🚀 **Developer Experience**
- One-click copy to clipboard
- Instant shareable links
- Mobile-responsive design
- Real-time view analytics

### 👥 **User Management**
- User registration and authentication
- Personal dashboard with bin management
- Profile customization
- Google OAuth integration

### 📱 **Modern UI/UX**
- Responsive design for all devices
- Smooth animations with Framer Motion
- Clean, intuitive interface
- Mobile burger menu

Aquí tienes el tech stack en inglés, limpio y listo para copiar y pegar en tu README o presentación técnica:

---

## 🧠 Tech Stack – `codebinx-frontend`

### 📦 Framework & Core

* **Next.js** 14 – React framework for SSR, routing, and fast builds
* **React** 18 – Main UI library
* **TypeScript** 5 – Type-safe JavaScript


### 🎨 Styling & UI Utilities

* **Tailwind CSS** 3 – Utility-first CSS framework
* **PostCSS** + **Autoprefixer** – CSS post-processing and compatibility
* **clsx** – Conditional class utility
* **tailwind-merge** – Merge conflicting Tailwind classes


### 🧩 UI Components

* **Radix UI Primitives**

  * `@radix-ui/react-alert-dialog`
  * `@radix-ui/react-label`
  * `@radix-ui/react-select`
  * `@radix-ui/react-slot`
  * `@radix-ui/react-switch`
* **lucide-react** – Clean SVG icon library
* **class-variance-authority** – Tailwind-friendly variant system


### 🎬 Animations

* **framer-motion** – Production-grade animation library for React


### 🧠 Code Editing

* **@monaco-editor/react** – React wrapper for the Monaco code editor (used in VSCode)
* **monaco-editor** – Core editor engine from VSCode


### 🧱 Shared Workspace Logic

* **@codebinx/shared** – Internal shared logic & types (imported via workspace)


### 🧪 Development Tools

* **ESLint** + **eslint-config-next** – Code linting and quality enforcement
* **Type Declarations**:

  * `@types/react`
  * `@types/react-dom`
  * `@types/node`



## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codebinx.git
   cd codebinx
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:5000](http://localhost:5000)

## 📁 Project Structure

```
codebinx/
├── app/                   # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── bin/[binId]/       # Individual bin view
│   ├── bins/              # Browse public bins
│   ├── create/            # Create new bin
│   ├── dashboard/         # User dashboard
│   ├── edit/[binId]/      # Edit bin page
│   ├── profile/           # User profile
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── ui/               # UI components (shadcn/ui)
│   └── site-header.tsx   # Main navigation
├── lib/                  # Utility functions
│   ├── auth.ts          # Authentication helpers
│   └── utils.ts         # General utilities
├── public/              # Static assets
├── package.json         # Dependencies
├── tailwind.config.ts   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── README.md           # This file
```

## 🎯 Usage

### Creating a Bin

1. **Navigate to Create Page**
   - Click "Create Bin" in the navigation
   - Or visit `/create` directly

2. **Write Your Code**
   - Paste or type your code in the Monaco editor
   - Select the appropriate programming language
   - Add a title and description (optional)

3. **Configure Settings**
   - Choose public or private visibility
   - Set password protection (optional)
   - Select expiration time
   - Click "Create Bin"

4. **Share Your Bin**
   - Copy the generated shareable link
   - Share with your team or community

### Managing Bins

- **Dashboard**: View all your created bins
- **Edit**: Modify existing bins you own
- **Delete**: Remove bins permanently
- **Analytics**: Track views and engagement

### Browsing Public Bins

- **Browse Page**: Discover community-shared bins
- **Search**: Find bins by title, description, or content
- **Filter**: Sort by language, date, or popularity
- **Pagination**: Navigate through multiple pages

## 🔧 Configuration

### Environment Variables

| Variable              | Description     | Default                 |
| --------------------- | --------------- | ----------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3000` |

### Supported Languages

- JavaScript
- TypeScript
- Python
- Java
- C++
- C
- C#
- PHP
- Ruby
- Go
- Rust
- Swift
- Kotlin
- HTML
- CSS
- JSON
- Markdown
- SQL
- Bash
- Plain Text

## 🚀 Deployment

### Vercel

1. **Connect Repository**
   - Import your GitHub repository to Vercel
   - Configure environment variables

2. **Deploy**
   ```bash
   npm run build
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   npm start
   ```

2. **Environment Setup**
   - Set production environment variables
   - Configure your domain and SSL

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**Monaco Editor not loading**
- Ensure `@monaco-editor/react` is properly installed
- Check browser console for errors

**Authentication issues**
- Verify JWT token in localStorage
- Check API endpoint configuration

**Styling problems**
- Run `npm run build` to regenerate Tailwind CSS
- Clear browser cache

### Getting Help

- 📧 Email: support@elmundodeniby.com
- 💬 Discord: [Join our community](https://discord.gg/codebinx)
- 🐛 Issues: [GitHub Issues](https://github.com/dewstouh/codebinx/issues)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Monaco Editor](https://microsoft.github.io/monaco-editor/) - Powerful code editor
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [Lucide Icons](https://lucide.dev/) - Beautiful icons

## 🔮 Roadmap

- [ ] **Real-time Collaboration** - Live editing with multiple users
- [ ] **Bin Templates** - Pre-built code templates
- [ ] **Dark Mode Toggle** - User preference for themes
- [ ] **Bin Categories** - Organize bins with tags
- [ ] **User Profiles** - Public developer profiles
- [ ] **Bin Comments** - Community feedback system
- [ ] **Bin Forking** - Create copies of existing bins
- [ ] **Collections** - Group related bins together

---

**Made by Diego Rodríguez | [elmundodeniby.com](https://elmundodeniby.com)**

[Website](https://codebinx.elmundodeniby.com) • [Documentation](https://codebinx.elmundodeniby.com/docs) • [API](https://codebinx.elmundodeniby.com/api) • [Status](https://codebinx.elmundodeniby.com/status)
