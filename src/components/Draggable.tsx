import React, { useState, useEffect } from 'react';

interface DraggableProps {
  src: string;
}

interface Position {
  x: number;
  y: number;
}

const Draggable: React.FC<DraggableProps> = ({ src }) => {
  /**
   * This component takes an src of an image and returns a draggable element on the page.
   * For now the position will be initialised at the bottom right corner.
   *
   * How it works:
   * - `isDragging` state tracks whether the img is being dragged
   * - `position` state tracks the current position (relative to the original position) to be used with `translate` in CSS
   * - `dragStartOffset` state tracks the cursor's relative position to the image. This is to ensure there is no "jump" of the image to the cursor's position when only using on state for tracking.
   * - When the mouse is pressed, first set `isDragging` to `true`, and set the cursor's offset
   * - When the mouse moves, set the `position` state based on the distance between the cursor and the initial offset when dragging started.
   * - When the mouse is released, set the `position` back, with a transition.
   */

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragStartOffset, setDragStartOffset] = useState<Position>({
    x: 0,
    y: 0,
  });

  const getCursorPosition = (e: MouseEvent | TouchEvent) => {
    if (e instanceof TouchEvent) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else {
      return { x: e.clientX, y: e.clientY };
    }
  };

  const onDragStart = (
    e: React.MouseEvent<HTMLImageElement> | React.TouchEvent<HTMLImageElement>
  ) => {
    const cursorPosition = getCursorPosition(e.nativeEvent);
    setIsDragging(true);
    setDragStartOffset({
      x: cursorPosition.x - position.x,
      y: cursorPosition.y - position.y,
    });
    e.preventDefault();
  };

  const onDrag = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const cursorPosition = getCursorPosition(e);
    setPosition({
      x: cursorPosition.x - dragStartOffset.x,
      y: cursorPosition.y - dragStartOffset.y,
    });
    e.preventDefault();
  };

  const onDragStop = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const options = isDragging ? { passive: false } : undefined;
    if (isDragging) {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onDragStop);
      document.addEventListener('touchmove', onDrag, options);
      document.addEventListener('touchend', onDragStop);
    } else {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragStop);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', onDragStop);
    }

    return () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onDragStop);
      document.removeEventListener('touchmove', onDrag);
      document.removeEventListener('touchend', onDragStop);
    };
  }, [isDragging, onDragStop, onDrag]);

  return (
    <img
      src={src}
      className="fixed bottom-0 right-4 max-w-8 max-h-8 cursor-grab"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.5s ease',
      }}
      draggable="false"
      onMouseDown={onDragStart}
      onTouchStart={onDragStart}
    />
  );
};

export default Draggable;
