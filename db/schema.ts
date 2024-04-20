import { pgTable, pgEnum, serial, varchar, integer } from 'drizzle-orm/pg-core';

export const keyboards = pgTable('keyboards', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  description: varchar('description', { length: 1024 }),
});

export const artisans = pgTable('artisans', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  maker: varchar('maker', { length: 256 }),
  sculpt: varchar('sculpt', { length: 256 }),
  colourway: varchar('colourway', { length: 256 }),
  mount: varchar('mount', { length: 256 }),
  descriptions: varchar('description', { length: 1024 }),
});

export const images = pgTable('images', {
  id: serial('id').primaryKey(),
  url: varchar('url', { length: 256 }).notNull(),
  description: varchar('description', { length: 1024 }),
});

export const albumsTypeEnum = pgEnum('type', ['keyboards', 'artisans']);

export const albums = pgTable('albums', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  type: albumsTypeEnum('type'),
});

export const imageKeyboards = pgTable('images_keyboards', {
  imagId: integer('image_id')
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
