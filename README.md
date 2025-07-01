# AI Chat with 3D Avatar

A modern chat interface with a 3D avatar powered by Google Gemini AI, built with Next.js 14, TypeScript, and Three.js.

## Features

- 🤖 **AI Chat**: Powered by Google Gemini API
- 🎭 **3D Avatar**: Interactive 3D model with animations
- 💬 **Real-time Chat**: Smooth chat interface with Markdown support
- 🎨 **Modern UI**: Beautiful design with Tailwind CSS
- 📱 **Responsive**: Works on desktop and mobile
- ⚡ **Fast**: Built with Next.js 14 and Turbopack

## Tech Stack

- **Frontend**: Next.js 14, React 19, TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js, React Three Fiber
- **State Management**: Zustand
- **AI**: Google Gemini API
- **Markdown**: React Markdown with GFM

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/aichat.git
cd aichat
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file and add your Gemini API key:
```bash
GEMINI_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run export` - Export static files for GitHub Pages
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### GitHub Pages

This project is configured for static export and can be deployed to GitHub Pages:

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `out/` directory
3. Deploy the contents of the `out/` directory to GitHub Pages

### Vercel

For Vercel deployment, remove the `output: 'export'` from `next.config.js` and deploy normally.

## Project Structure

```
src/
├── components/
│   ├── Avatar/          # 3D avatar components
│   ├── Chat/            # Chat interface components
│   └── UI/              # Reusable UI components
├── lib/
│   ├── gemini.ts        # Gemini API integration
│   └── stores.ts        # Zustand stores
├── types/
│   └── index.ts         # TypeScript type definitions
└── app/
    └── page.tsx         # Main page component
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Acknowledgments

- [Google Gemini](https://ai.google.dev/) for AI capabilities
- [Three.js](https://threejs.org/) for 3D graphics
- [Next.js](https://nextjs.org/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
=======
# Avatar-Chat-3D
Ai chat interface with 3D space
# Test commit
