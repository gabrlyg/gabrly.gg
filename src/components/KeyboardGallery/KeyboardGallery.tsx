import React from 'react';
import type { Keyboard } from '../../pages/keyboard-gallery/fakeDB';
import Album from './Album';

interface Props {
  keyboards: Keyboard[];
}

const KeyboardGallery: React.FC<Props> = ({ keyboards }) => {
  console.log(keyboards);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-lg px-4 pt-6">Keyboard Gallery</h2>
      <div className="py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {keyboards.map((keyboard) => (
          <Album {...keyboard} />
        ))}
      </div>
    </div>
  );
};

export default KeyboardGallery;
