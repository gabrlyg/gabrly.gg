export interface Keyboard {
  name: string;
  model?: string;
  images: string[];
  cover: string;
}

export const fakeDB: Keyboard[] = [
  {
    name: 'OTD 356 CL DGE',
    model: 'OTD 356 CL DGE',
    images: [
      'otd-356-cl-dge-1.jpg',
      'otd-356-cl-dge-2.jpg',
      'otd-356-cl-dge-3.jpg',
      'otd-356-cl-dge-4.jpg',
      'otd-356-cl-dge-5.jpg',
      'otd-356-cl-dge-6.jpg',
    ],
    cover: 'otd-356-cl-dge-6.jpg',
  },
  {
    name: 'HHKB Pro Hybrid Type-S (Ivory)',
    model: 'HHKB Pro Hybrid Type-S (Ivory)',
    images: [
      'hhkb-pro-hybrid-type-s-1.jpg',
      'hhkb-pro-hybrid-type-s-2.jpg',
      'hhkb-pro-hybrid-type-s-3.jpg',
    ],
    cover: 'hhkb-pro-hybrid-type-s-2.jpg',
  },
  {
    name: 'NRD Kaze (Silver)',
    model: 'NRD Kaze (Silver)',
    images: ['nrd-kaze-silver-og-1.jpg', 'nrd-kaze-silver-og-2.jpg'],
    cover: 'nrd-kaze-silver-og-1.jpg',
  },
  {
    name: 'NRD Kaze (Truffle Brown)',
    model: 'NRD Kaze (Silver)',
    images: [
      'nrd-kaze-truffle-brown-1.jpg',
      'nrd-kaze-truffle-brown-2.jpg',
      'nrd-kaze-truffle-brown-3.jpg',
      'nrd-kaze-truffle-brown-4.jpg',
    ],
    cover: 'nrd-kaze-truffle-brown-4.jpg',
  },
  {
    name: 'Realforce R1 RF"84S"',
    model: 'Realforce R1 RF"84S"',
    images: [
      'realforce-rf84-1.jpg',
      'realforce-rf84-2.jpg',
      'realforce-rf84-3.jpg',
      'realforce-rf84s-1.jpg',
      'realforce-rf84s-2.jpg',
      'realforce-rf84s-3.jpg',
    ],
    cover: 'realforce-rf84-1.jpg',
  },
];
