export interface Resin {
  colourway: string;
  sculpt: string;
  maker: string;
  image: string;
  stem: 'Topre' | 'MX' | 'BS' | 'BMX'[];
}

export interface ResinInWishlist extends Resin {
  priority?: 'Highest' | 'High' | 'Medium' | 'Low';
}
