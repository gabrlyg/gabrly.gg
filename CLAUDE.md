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
- Astro with SSR enabled (server output mode)
- React components for interactive elements
- Tailwind CSS for styling
- Deployed on Netlify

**Backend Architecture:**
- tRPC for type-safe API layer (src/trpc/)
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
- 3D interactive elements (Three.js)
- Notion API integration for dynamic wishlist updates

**Database Schema:**
The app manages a keyboard/artisan collection with:
- Keyboards and artisans as main entities
- Images as separate entities with many-to-many relationships
- Wishlist functionality for artisans with priority levels

When working with the database, use the provided npm scripts for migrations and seeding. The schema is defined in `db/schema.ts` using Drizzle ORM syntax.