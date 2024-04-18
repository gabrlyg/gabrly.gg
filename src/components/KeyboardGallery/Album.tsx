import React, { useId } from 'react';

interface Props {
  name: string;
  cover: string;
}

const Album: React.FC<Props> = ({ name, cover }) => {
  const id = useId();

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        className="aspect-3/2 object-cover"
        id={id}
        src={`/assets/keyboards/${cover}`}
      />
      <label className="text-sm">{name}</label>
    </div>
  );
};

export default Album;
