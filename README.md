# STARD - Automotive Engineering Website

A modern, functional website for STARD, an Austrian car engineering company specializing in developing and engineering cars and parts for major auto companies like Ford.

## Features

- Modern 2026-inspired design with dark theme and futuristic elements
- Responsive layout with engineering and car vibes
- Sections: Hero, About, Services, Contact
- Built with React, TypeScript, and Vite for fast development and performance

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the website.

### Build

Build for production:
```bash
npm run build
```

### Preview

Preview the production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Technologies Used

- React 19
- TypeScript
- Vite
- ESLint
- CSS with modern features (gradients, backdrop-filter, animations)

## Project Structure

```
src/
├── App.css          # Main styles
├── App.tsx          # Main component
├── index.css        # Global styles
└── main.tsx         # Entry point
```

## Customization

- Update content in `App.tsx`
- Modify styles in `App.css` and `index.css`
- Add images or assets in `public/` or `src/assets/`

## License

This project is private.
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
