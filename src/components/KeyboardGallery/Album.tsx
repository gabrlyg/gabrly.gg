import React, { useCallback, useEffect, useRef, useState } from 'react';
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
    <li ref={ref} key={index} className="snap-center flex-shrink-0">
      <button
        onClick={() => {
          setCurrentImage(index);
        }}
      >
        <img
          className="max-h-40 object-contain"
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

  const previousImage = useCallback(() => {
    setCurrentImage(currentImage === 0 ? images.length - 1 : currentImage - 1);
  }, [currentImage, setCurrentImage]);

  const nextImage = useCallback(() => {
    setCurrentImage(currentImage === images.length - 1 ? 0 : currentImage + 1);
  }, [currentImage, setCurrentImage]);

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col justify-between items-center gap-4 py-4">
      {/* begin close button */}
      <button
        className="flex justify-center flex-shrink-0 items-center w-10 h-10 text-slate-200 text-2xl self-end mt-4 mr-4"
        onClick={handleClose}
        aria-label="Close"
      >
        ✕
      </button>
      {/* end close button */}
      {/* begin main image
      `overflow-hidden` here is necessary other wise image will try to take
      100% of the width */}
      <div className="flex flex-row justify-center items-center overflow-hidden relative w-full">
        <button
          className="w-10 h-10 text-2xl text-slate-200 flex-shrink-0"
          onClick={previousImage}
          aria-label="Previous Image"
        >{`<`}</button>
        <div className="w-full h-full">
          <img
            className="w-full h-full object-contain"
            src={`${PHOTO_PATH_PREFIX}${images[currentImage]}`}
          />
        </div>
        <button
          className="w-10 h-10 text-2xl text-slate-200 flex-shrink-0"
          onClick={nextImage}
          aria-label="Next Image"
        >{`>`}</button>
      </div>
      {/* end main image */}
      {/* begin thumbnail */}
      <div className="flex justify-center items-center px-4">
        <ul className="flex flex-row flex-shrink-0 overflow-x-auto overflow-y-hidden gap-4 h-40 w-full scroll-smooth snap-x items-center">
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
      {/* end thumbnail */}
    </div>
  );
};

const Album: React.FC<Keyboard> = ({ name, images, cover }) => {
  const coverImageIndex = images.findIndex((image) => image === cover);

  const [isFullScreenOn, setIsFullScreenOn] = useState<boolean>(false);

  const openFullScreen: React.MouseEventHandler<HTMLButtonElement> =
    useCallback(
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
      <button
        className="flex flex-col items-center cursor-zoom-in relative group/album"
        onClick={openFullScreen}
      >
        <img
          className="aspect-square object-cover"
          src={`${PHOTO_PATH_PREFIX}${cover}`}
        />
        <label className="text-lg text-slate-100 font-bold absolute inset-0 p-4 opacity-0 flex bg-transparent transition-all duration-200 justify-center items-center group-hover/album:opacity-100 group-hover/album:bg-neutral-600/80 group-hover/album:cursor-zoom-in">
          {name}
        </label>
      </button>
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
