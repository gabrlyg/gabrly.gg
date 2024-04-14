import React, { useEffect, useState } from 'react';
import Draggable from './Draggable';
import { useStore } from '@nanostores/react';
import { isGlorpModeOn } from '../stores/glorpStore';

const Glorp = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const $isGlorpModeOn = useStore(isGlorpModeOn);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className={isMounted && $isGlorpModeOn ? '' : 'hidden'}>
      <Draggable src="/emojis/glorp.webp" />
    </div>
  );
};

export default Glorp;
