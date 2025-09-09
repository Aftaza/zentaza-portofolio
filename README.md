# Zentaza Portfolio Website

A modern, responsive portfolio website built with Astro.js, TailwindCSS, and shadcn/ui components. This portfolio showcases projects, skills, and blog articles with a clean, professional design and smooth animations.

## Features

- **Modern UI**: Clean, responsive design with dark/light mode support
- **Performance**: Fast loading with Astro's static site generation
- **SEO Optimized**: Meta tags, sitemap, and robots.txt included
- **Interactive Components**: Smooth animations and transitions using Framer Motion
- **Cross-browser Compatible**: Works on all modern browsers
- **Responsive Design**: Fully responsive layout for all device sizes
- **Accessibility**: WCAG compliant components and semantic HTML

## Tech Stack

- **Framework**: [Astro.js](https://astro.build/) - Static site generator for faster performance
- **Styling**: [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon set
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Deployment**: Vercel, Netlify, or Cloudflare Pages

## Pages

### Home
- Hero section with animated introduction
- Skills showcase with animated cards
- Featured projects carousel
- Call-to-action section

### About
- Personal bio and professional summary
- Experience timeline with interactive elements
- Skills visualization with progress indicators
- Education and certifications showcase

### Portfolio
- Project showcase with 3D carousel
- Category filtering system
- Detailed project pages with descriptions and technologies used
- Links to GitHub repositories and live demos

### Blog
- Article listing with search and filtering capabilities
- Tag-based categorization
- Pagination system
- Individual article pages (MDX support)

### Contact
- Modern contact section with clear call-to-action
- Contact information display
- Social media links
- CV download option

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd new-portofolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:4321`

4. Build for production:
   ```bash
   npm run build
   ```

5. Preview the production build:
   ```bash
   npm run preview
   ```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── about/           # About page specific components
│   ├── common/          # Shared components
│   ├── home/            # Home page specific components
│   ├── portfolio/       # Portfolio page specific components
│   ├── blog/            # Blog page specific components
│   ├── contact/         # Contact page specific components
│   └── ui/              # shadcn/ui components
├── layouts/             # Page layouts
├── pages/               # Page routes
│   ├── blog/            # Blog article pages (MDX)
│   ├── portfolio/       # Portfolio project pages (MDX)
│   └── ...              # Main page routes
├── lib/                 # Utility functions and data
├── styles/              # Global styles and Tailwind configuration
public/
├── images/              # Image assets
├── favicon.svg          # Favicon
├── cv.pdf               # Resume/CV
├── sitemap.xml          # SEO sitemap
├── robots.txt           # SEO robots file
```

## Component Architecture

### UI Components (`src/components/ui/`)
- Pre-built shadcn/ui components (Button, Card, Input, etc.)
- Customized with Tailwind classes

### Page Components (`src/components/[page]/`)
- Page-specific components organized by route
- Each page has its own component directory for better organization

### Common Components (`src/components/common/`)
- Shared components used across multiple pages
- Includes animations, cards, and reusable UI elements

### Layout Components (`src/layouts/`)
- Page layout templates
- Main layout with header, footer, and theme support

## Styling

This project uses TailwindCSS for styling with the following conventions:

- **Utility Classes**: Direct usage of Tailwind utility classes
- **Custom Classes**: Defined in `src/styles/global.css` for complex styles
- **Dark Mode**: Automatic dark/light mode support with `dark:` variants
- **Responsive Design**: Mobile-first approach with responsive breakpoints

## Animations

Animations are implemented using Framer Motion:

- **Page Transitions**: Smooth transitions between pages
- **Component Animations**: Staggered animations for lists and grids
- **Hover Effects**: Interactive hover states for buttons and cards
- **Scroll Animations**: Scroll-triggered animations for enhanced UX

## Data Management

- **Static Data**: Defined in `src/lib/allData.ts`
- **Type Definitions**: Defined in `src/lib/data.d.ts`
- **Dynamic Data**: Fetched from APIs or CMS when needed
- **Helper Functions**: Utility functions for data manipulation

## Customization

### Content Updates
1. Update text content in the `src/pages/` directory
2. Modify data in `src/lib/allData.ts` for portfolio items, certifications, etc.
3. Add new blog articles in `src/pages/blog/` as MDX files
4. Add new portfolio projects in `src/pages/portfolio/` as MDX files

### Styling Customization
1. Modify Tailwind theme in `tailwind.config.js`
2. Update global styles in `src/styles/global.css`
3. Customize individual component styles with Tailwind classes

### Component Customization
1. Modify existing components in `src/components/`
2. Add new components in appropriate directories
3. Create new page-specific component directories as needed

### Theme Customization
1. Update color scheme in `tailwind.config.js`
2. Modify dark/light mode variables in CSS
3. Adjust component themes in shadcn/ui configuration

## Deployment

This site can be deployed to:

- [Vercel](https://vercel.com/) - Recommended for Astro projects
- [Netlify](https://netlify.com/) - Simple drag-and-drop deployment
- [Cloudflare Pages](https://pages.cloudflare.com/) - Fast global CDN

### Deployment Steps

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist/` directory to your preferred platform

### Environment Variables

Create a `.env` file in the root directory for any environment-specific variables:

```env
# Example environment variables
PUBLIC_SITE_URL=https://yourdomain.com
```

## Performance Optimization

- **Image Optimization**: Use modern formats and responsive images
- **Code Splitting**: Automatic code splitting with Astro
- **Lazy Loading**: Components loaded only when needed
- **Minification**: Automatic CSS and JS minification
- **Caching**: Proper cache headers for static assets

## SEO Best Practices

- **Meta Tags**: Proper title and description for each page
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Automatically generated sitemap.xml
- **Robots.txt**: Proper crawling instructions
- **Accessibility**: Semantic HTML and ARIA attributes

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Astro.js](https://astro.build/) - The web framework for content-driven websites
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Reusable component library
- [Framer Motion](https://www.framer.com/motion/) - Motion library for React
- [Lucide Icons](https://lucide.dev/) - Beautiful icon set

## Support

If you have any questions or need help with customization, please open an issue on GitHub or contact the project maintainer.