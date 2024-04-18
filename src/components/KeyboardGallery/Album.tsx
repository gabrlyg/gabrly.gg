import React, { useCallback, useId, useState } from 'react';
import type { Keyboard } from '../../pages/keyboard-gallery/fakeDB';

const PHOTO_PATH_PREFIX =
  'https://s3.eu-west-2.amazonaws.com/gabrly.gg/gallery/keyboards/';

const Album: React.FC<Keyboard> = ({ name, images, cover }) => {
  const id = useId();
  const [isFullScreenOn, setIsFullScreenOn] = useState<boolean>(false);
  const [currentImage, setCurrentImage] = useState<number>(
    images.findIndex((image) => image === cover)
  );

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
        <div className="fixed inset-0 bg-black flex flex-col items-center justify-between gap-4 p-4">
          <button
            className="flex justify-center flex-shrink-0 items-center w-10 h-10 bg-slate-200 text-slate-700 rounded-full self-end"
            onClick={handleFullScreenClose}
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
          <ul className="flex flex-row justify-center flex-shrink-0 gap-4 h-44">
            {images.map((image, index) => {
              return (
                <li key={index}>
                  <img
                    className="h-full min-w-40 object-contain"
                    src={`${PHOTO_PATH_PREFIX}${image}`}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
};

export default Album;
