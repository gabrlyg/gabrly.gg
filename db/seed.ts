import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { neon } from '@neondatabase/serverless';
import { keyboards, images, artisans, imageKeyboards } from './schema';
import { config } from 'dotenv';

config({ path: '.env' });

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const seed = async () => {
  await db.insert(keyboards).values([
    {
      name: 'OTD 356 CL DGE',
      description: `Noting to see here, just an OTD 356 CL DGE.`,
    },
    {
      name: 'HHKB Pro Hybrid Type-S (Ivory)',
      description: 'My daily driver HHKB.',
    },
    {
      name: 'NRD Kaze (Truffle Brown)',
      description: 'Kaze commission yay!',
    },
    {
      name: 'Realforce R1 RF"84"(S)',
      description: 'WKL Realforce best Realforce.',
    },
    {
      name: 'NRD Kaze (Silver)',
      description: 'What? Another Kaze?',
    },
  ]);

  await db
    .insert(images)
    .values([
      { url: 'otd-356-cl-dge-1.jpg' },
      { url: 'otd-356-cl-dge-2.jpg' },
      { url: 'otd-356-cl-dge-3.jpg' },
      { url: 'otd-356-cl-dge-4.jpg' },
      { url: 'otd-356-cl-dge-5.jpg' },
      { url: 'otd-356-cl-dge-6.jpg' },
      { url: 'hhkb-pro-hybrid-type-s-1.jpg' },
      { url: 'hhkb-pro-hybrid-type-s-2.jpg' },
      { url: 'hhkb-pro-hybrid-type-s-3.jpg' },
      { url: 'nrd-kaze-silver-og-1.jpg' },
      { url: 'nrd-kaze-silver-og-2.jpg' },
      { url: 'nrd-kaze-truffle-brown-1.jpg' },
      { url: 'nrd-kaze-truffle-brown-2.jpg' },
      { url: 'nrd-kaze-truffle-brown-3.jpg' },
      { url: 'nrd-kaze-truffle-brown-4.jpg' },
      { url: 'realforce-rf84-1.jpg' },
      { url: 'realforce-rf84-2.jpg' },
      { url: 'realforce-rf84-3.jpg' },
      { url: 'realforce-rf84s-1.jpg' },
      { url: 'realforce-rf84s-2.jpg' },
      { url: 'realforce-rf84s-3.jpg' },
    ]);

  await db.insert(artisans).values([
    {
      colourway: 'Blood Martian',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'Topre',
    },
    {
      colourway: '3D',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'Topre',
    },
    {
      colourway: 'F2 Blue',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'Topre',
    },
    {
      colourway: 'Peach / Cantaloupe (unofficial)',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'MX',
    },
    {
      colourway: 'Sharkette Lilac (discoloured)',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'MX',
      descriptions: 'I wonder what happened.',
    },
    {
      colourway: 'Ocotopink (discoloured)',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'Topre',
      descriptions: 'I wonder what happened.',
    },
    {
      colourway: 'Hack Orange',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'Topre',
    },
    {
      colourway: 'Drunken Faded',
      maker: 'ClackFactory',
      sculpt: 'Skull',
      stem: 'Topre',
    },
  ]);

  await db.insert(imageKeyboards).values([
    { keyboardId: 1, imageId: 1 },
    { keyboardId: 1, imageId: 2 },
    { keyboardId: 1, imageId: 3 },
    { keyboardId: 1, imageId: 4 },
    { keyboardId: 1, imageId: 5 },
    { keyboardId: 1, imageId: 6 },
    { keyboardId: 2, imageId: 7 },
    { keyboardId: 2, imageId: 8 },
    { keyboardId: 2, imageId: 9 },
    { keyboardId: 3, imageId: 12 },
    { keyboardId: 3, imageId: 13 },
    { keyboardId: 3, imageId: 14 },
    { keyboardId: 3, imageId: 15 },
    { keyboardId: 4, imageId: 16 },
    { keyboardId: 4, imageId: 17 },
    { keyboardId: 4, imageId: 18 },
    { keyboardId: 4, imageId: 19 },
    { keyboardId: 4, imageId: 20 },
    { keyboardId: 4, imageId: 21 },
    { keyboardId: 5, imageId: 10 },
    { keyboardId: 5, imageId: 11 },
  ]);

  await db.batch([
    db.update(keyboards).set({ coverImg: 6 }).where(eq(keyboards.id, 1)),
    db.update(keyboards).set({ coverImg: 8 }).where(eq(keyboards.id, 2)),
    db.update(keyboards).set({ coverImg: 11 }).where(eq(keyboards.id, 5)),
    db.update(keyboards).set({ coverImg: 15 }).where(eq(keyboards.id, 3)),
    db.update(keyboards).set({ coverImg: 16 }).where(eq(keyboards.id, 4)),
  ]);
};

try {
  await seed();
  console.log('db seeded successfully');
} catch (error) {
  console.error('db seeding failed: ', error);
  process.exit(1);
}
