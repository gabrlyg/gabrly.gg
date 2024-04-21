import {
  pgTable,
  serial,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';

export const keyboards = pgTable('keyboards', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  description: varchar('description', { length: 1024 }),
  coverImg: integer('cover_img').references(() => images.id),
  addedAt: timestamp('added_at').notNull().defaultNow(),
});

export const artisans = pgTable('artisans', {
  id: serial('id').primaryKey(),
  colourway: varchar('colourway', { length: 256 }),
  maker: varchar('maker', { length: 256 }),
  sculpt: varchar('sculpt', { length: 256 }),
  stem: varchar('mount', { length: 256 }),
  descriptions: varchar('description', { length: 1024 }),
  coverImg: integer('cover_img').references(() => images.id),
  addedAt: timestamp('added_at').notNull().defaultNow(),
});

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
  uploadedAt: timestamp('uploaded_at').notNull().defaultNow(),
});

export const imageKeyboards = pgTable('images_keyboards', {
  imageId: integer('image_id')
    .notNull()
    .references(() => images.id),
  keyboardId: integer('keyboard_id')
    .notNull()
    .references(() => keyboards.id),
});

export const imageArtisans = pgTable('images_artisans', {
  imageId: integer('image_id')
    .notNull()
    .references(() => images.id),
  artisanId: integer('artisan_id')
    .notNull()
    .references(() => artisans.id),
});

export const artisanWishlist = pgTable('artisan_wishlist', {
  id: serial('id').primaryKey(),
  artisanId: integer('artisan_id')
    .notNull()
    .references(() => artisans.id),
  thumbnail: varchar('thumbnail', { length: 256 }), // url of the thumbnail image on S3
  ranking: integer('ranking'),
  priority: varchar('priority', { enum: ['Grail', 'High', 'Mid', 'Low'] }),
});
