import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Item {
  x: number;
  y: number;
  z: number;
  speed: number;
  type: 'wtb' | 'peasoup' | 'image';
}

const DEPTH = 1500;
const SPEED = 100;
const DIRECTION_FACTOR = 0.05;

const getItemType = () => {
  const randomNumber = Math.random();
  if (randomNumber < 0.3) return 'wtb';
  else if (randomNumber > 0.3 && randomNumber < 0.6) return 'peasoup';
  return 'image';
};

const Peasoup = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const itemsRef = useRef<Item[]>([]);
  const requestRef = useRef<number>();
  const frameCount = useRef<number>(0);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImage(img);
    img.src = 'resin/thumbnails/peasoup-skull.jpeg';
  }, []);

  const addItem = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    itemsRef.current.push({
      x: Math.random() * width,
      y: Math.random() * height,
      z: DEPTH,
      speed: SPEED,
      type: getItemType(),
    });
  }, []);

  const draw = useCallback(() => {
    if (!canvasRef.current || !image) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d')!;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, width, height);

    itemsRef.current.forEach((item, index) => {
      const center = { x: width / 2, y: height / 2 };

      // Calculate movement towards the center (converging effect) or away from the center (diverging effect)
      item.x += (item.x - center.x) * DIRECTION_FACTOR;
      item.y += (item.y - center.y) * DIRECTION_FACTOR;

      const k = 1 - item.z / DEPTH;
      const px = item.x;
      const py = item.y;

      let itemWidth = 0,
        itemHeight = 0;

      if (item.type === 'wtb' || item.type === 'peasoup') {
        const textValue = item.type === 'wtb' ? 'WTB' : 'Peasoup (T)';
        const fontSize = k * 18;
        ctx.font = `${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = 'white';
        ctx.fillText(textValue, px, py);
        itemWidth = ctx.measureText(textValue).width;
        itemHeight = fontSize;
      } else {
        const initialWidth = 0;
        const finalWidth = 100;
        const scale = k * (finalWidth - initialWidth);
        const aspectRatio = 333 / 266;
        const imageWidth = scale * aspectRatio;
        const imageHeight = scale;
        ctx.drawImage(
          image,
          px - imageWidth / 2,
          py - imageHeight / 2,
          imageWidth,
          imageHeight
        );
        itemWidth = imageWidth;
        itemHeight = imageHeight;
      }

      // Update item position for next frame
      item.z -= item.speed;
      if (
        px + itemWidth / 2 < 0 ||
        px - itemWidth / 2 > width ||
        py + itemHeight / 2 < 0 ||
        py - itemHeight / 2 > height
      ) {
        itemsRef.current.splice(index, 1); // Remove item if it moves out of view
      }
    });

    // Control item generation frequency
    if (frameCount.current++ % 1 === 0) {
      // Generate new item every 1 frames
      addItem();
    }

    if (isAnimating) {
      requestRef.current = requestAnimationFrame(draw);
    }
  }, [image, isAnimating, addItem]);

  useEffect(() => {
    if (!image) return;
    requestRef.current = requestAnimationFrame(draw);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [draw, image]);

  // const toggleAnimation = () => {
  //   setIsAnimating(!isAnimating);
  //   if (!isAnimating) {
  //     draw();
  //   }
  // };

  return (
    <div>
      <canvas className="fixed inset-0" ref={canvasRef} />
      {/* <button onClick={toggleAnimation}>{isAnimating ? 'Pause' : 'Resume'}</button> */}
    </div>
  );
};

export default Peasoup;
