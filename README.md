# Anil Chitrapu - Personal Website

A clean, minimal personal website built with Next.js.

## Features

- Responsive design
- Dark mode support
- Simple, content-focused layout
- Visual experience timeline with images
- Next.js App Router
- JavaScript

## Getting Started

### Prerequisites

- Node.js 18.x or later

### Installation

1. Clone the repository
```bash
git clone https://github.com/anilchitrapu/personal-site.git
cd personal-site
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

```bash
npm run build
```

Then, you can start the production server:

```bash
npm run start
```

## Deployment

This site can be easily deployed to Vercel, Netlify, or any other Next.js-compatible hosting platform.

## Site Structure

- **Header**: Name, title, tagline, and social links
- **About**: Personal introduction and background
- **Experience**: Professional experience with visual timeline
- **Projects**: Notable projects with images and descriptions

## Customization

The site uses CSS variables for theming. You can modify the colors in `src/app/globals.css`:

```css
:root {
  --background: #f4f4f4;
  --text-primary: #161616;
  --text-secondary: #525252;
  --link: #0f62fe;
  --link-hover: #0043ce;
  --placeholder-bg: #e0e0e0;
}
```

## License

MIT
