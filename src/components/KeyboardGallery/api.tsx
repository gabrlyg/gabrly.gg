export interface Image {
  id: number;
  url: string;
  description: string | null;
  updatedAt: string;
}

export interface Keyboard {
  id: number;
  name: string;
  description: string;
  addedAt: string;
  coverImg: number | Image;
  imageKeyboards?: Image[];
}

export const fetchKeyboard = async (id: number) => {
  const response = await fetch(`${window.location.origin}/api/keyboards/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch keyboard info');
  }
  return response.json();
};
