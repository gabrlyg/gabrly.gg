export interface Resin {
  name: string;
  sculpt: string;
  maker: string;
  thumbnail: string;
  stem: 'Topre' | 'MX' | 'BS' | 'BMX'[];
}

export interface ResinInWishlist extends Resin {
  priority: 'Highest' | 'High' | 'Medium' | 'Low';
}
