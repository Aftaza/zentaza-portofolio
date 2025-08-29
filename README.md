# Zentaza Portfolio Website

A modern, responsive portfolio website built with Astro.js, TailwindCSS, and shadcn/ui components.

## Features

- **Modern UI**: Clean, responsive design with dark/light mode support
- **Performance**: Fast loading with Astro's static site generation
- **SEO Optimized**: Meta tags, sitemap, and robots.txt included
- **Interactive Components**: Smooth animations and transitions
- **Cross-browser Compatible**: Works on all modern browsers

## Tech Stack

- **Framework**: [Astro.js](https://astro.build/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: Vercel, Netlify, or Cloudflare Pages

## Pages

1. **Home** - Hero section with introduction and call-to-action
2. **About** - Personal bio, experience timeline, and skills
3. **Portfolio** - Project showcase with category filtering
4. **Blog** - Articles with search and filtering capabilities
5. **Contact** - Contact form and information

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts
├── pages/          # Page routes
├── lib/            # Utility functions
├── styles/         # Global styles
public/
├── favicon.svg     # Favicon
├── cv.pdf          # Resume/CV
├── sitemap.xml     # SEO sitemap
├── robots.txt      # SEO robots file
```

## Customization

1. **Content**: Update content in the `src/pages/` directory
2. **Styling**: Modify Tailwind classes or update `src/styles/global.css`
3. **Components**: Customize UI components in `src/components/`
4. **SEO**: Update meta tags in `src/layouts/MainLayout.astro`

## Deployment

This site can be deployed to:

- [Vercel](https://vercel.com/)
- [Netlify](https://netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

Simply connect your Git repository to your preferred platform and follow their deployment instructions.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.