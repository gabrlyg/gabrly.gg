# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Development server:
```bash
npm run dev          # Starts dev server at localhost:4321
npm run start        # Alias for dev
```

Building and checking:
```bash
npm run build        # Standard build
npm run build:strict # Build with type checking (astro check && astro build)
npm run preview      # Preview production build locally
```

Database operations:
```bash
npm run db:generate  # Generate Drizzle schema migrations
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with initial data
```

## Architecture Overview

This is an Astro-based personal website (gabrly.gg) with the following key components:

**Frontend Stack:**
- Astro v5 with SSR enabled (server output mode)
- React v19 components for interactive elements
- Tailwind CSS v4 with native Vite plugin (no @astrojs/tailwind integration)
- Deployed on Netlify

**Backend Architecture:**
- tRPC v11 for type-safe API layer (src/trpc/)
- Database: PostgreSQL with Drizzle ORM
- Neon Database as PostgreSQL provider
- Notion API integration for resin wishlist data

**Data Models:**
- Keyboards, artisans, and images with relational structure
- Artisan wishlist with priority rankings
- Many-to-many relationships between keyboards/artisans and images

**Key Directories:**
- `src/pages/` - File-based routing (Astro pages and API endpoints)
- `src/components/` - Reusable UI components (mix of Astro and React)
- `src/trpc/` - tRPC client/server setup and procedures
- `db/` - Database schema, migrations, and Notion integration
- `drizzle/` - Generated migration files

**Notable Features:**
- Keyboard gallery with image management
- Resin artisan collection and wishlist
- 3D interactive elements (Three.js) (/peasoup)
- Notion API integration for dynamic wishlist updates

**Database Schema:**
The app manages a keyboard/artisan collection with:
- Keyboards and artisans as main entities
- Images as separate entities with many-to-many relationships
- Wishlist functionality for artisans with priority levels

When working with the database, use the provided npm scripts for migrations and seeding. The schema is defined in `db/schema.ts` using Drizzle ORM syntax.

## Tailwind CSS v4 Configuration

This project uses Tailwind CSS v4 with the native Vite plugin instead of the deprecated @astrojs/tailwind integration.

**Configuration Files:**
- `src/styles/main.css` - Main stylesheet with `@import "tailwindcss"` and custom theme
- `astro.config.mjs` - Contains `@tailwindcss/vite` plugin in vite.plugins array
- No `tailwind.config.js` - configuration is now CSS-based using `@theme` directive

**Custom Theme Variables:**
- `--font-lato` and `--font-jetbrains-mono` for custom fonts
- `--shadow-box-md` for custom box shadows with opacity support
- `--aspect-ratio-*` for custom aspect ratios
- Custom utilities defined with `@utility` directive (e.g., toggle-slider)

**Important Notes:**
- Custom styles use CSS variables and `@theme` blocks instead of JS configuration
- Custom utilities work with Tailwind's variant system (hover:, before:, etc.)
- Opacity modifiers work with custom shadows (shadow-box-md/50)