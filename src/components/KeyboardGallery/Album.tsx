import React, { useId } from 'react';

interface Props {
  name: string;
  cover: string;
}

const PHOTO_PATH_PREFIX =
  'https://s3.eu-west-2.amazonaws.com/gabrly.gg/gallery/keyboards/';

const Album: React.FC<Props> = ({ name, cover }) => {
  const id = useId();

  return (
    <div className="flex flex-col items-center gap-4">
      <img
        className="aspect-4/3 object-cover"
        id={id}
        src={`${PHOTO_PATH_PREFIX}${cover}`}
      />
      <label className="text-sm">{name}</label>
    </div>
  );
};

export default Album;
