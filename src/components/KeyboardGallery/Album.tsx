import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import type { Keyboard } from '../../pages/keyboard-gallery/fakeDB';

interface ThumbnailProps {
  image: string;
  index: number;
  selected: boolean;
  setCurrentImage: React.Dispatch<React.SetStateAction<number>>;
}

interface FullScreenModeProps {
  images: string[];
  coverIndex: number;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

const PHOTO_PATH_PREFIX =
  'https://s3.eu-west-2.amazonaws.com/gabrly.gg/gallery/keyboards/';

const ImageThumbnail: React.FC<ThumbnailProps> = ({
  image,
  index,
  selected,
  setCurrentImage,
}) => {
  const ref = useRef<HTMLLIElement>(null);
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (selected) {
      ref.current?.scrollIntoView({
        behavior: isFirstRender ? 'instant' : 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selected, isFirstRender]);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  return (
    <li ref={ref} key={index} className="snap-center">
      <button
        onClick={() => {
          setCurrentImage(index);
        }}
      >
        <img
          className="max-h-44 min-w-40 object-contain"
          src={`${PHOTO_PATH_PREFIX}${image}`}
          draggable={false}
        />
      </button>
    </li>
  );
};

const FullScreenMode: React.FC<FullScreenModeProps> = ({
  images,
  coverIndex,
  handleClose,
}) => {
  const [currentImage, setCurrentImage] = useState<number>(coverIndex);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-between gap-4 p-4">
      <button
        className="flex justify-center flex-shrink-0 items-center w-10 h-10 bg-slate-200 text-slate-700 rounded-full self-end mt-4"
        onClick={handleClose}
      >
        X
      </button>
      {/* `overflow-hidden` here is necessary other wise image will try to take
      100% of the width */}
      <div className="flex justify-center items-center max-h-full overflow-hidden">
        <img
          className="max-h-full max-w-full object-contain"
          src={`${PHOTO_PATH_PREFIX}${images[currentImage]}`}
        />
      </div>
      <ul className="flex flex-row overflow-x-auto overflow-y-hidden gap-4 min-h-44 scroll-smooth snap-x items-center justify-center">
        {images.map((image, index) => (
          <ImageThumbnail
            image={image}
            index={index}
            selected={index === currentImage}
            setCurrentImage={setCurrentImage}
          />
        ))}
      </ul>
    </div>
  );
};

const Album: React.FC<Keyboard> = ({ name, images, cover }) => {
  const coverImageIndex = images.findIndex((image) => image === cover);

  const [isFullScreenOn, setIsFullScreenOn] = useState<boolean>(false);

  const openFullScreen: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      setIsFullScreenOn(true);
      e.preventDefault();
    },
    [setIsFullScreenOn]
  );
  const handleFullScreenClose: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (e) => {
        setIsFullScreenOn(false);
      },
      [setIsFullScreenOn]
    );

  return (
    <>
      <div
        className="flex flex-col items-center cursor-zoom-in"
        onClick={openFullScreen}
      >
        <img
          className="aspect-square object-cover"
          src={`${PHOTO_PATH_PREFIX}${cover}`}
        />
        <label className="text-sm">{name}</label>
      </div>
      {isFullScreenOn && (
        <FullScreenMode
          images={images}
          coverIndex={coverImageIndex}
          handleClose={handleFullScreenClose}
        />
      )}
    </>
  );
};

export default Album;
