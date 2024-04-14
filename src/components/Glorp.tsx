import React, { useEffect, useState } from 'react';
import Draggable from './Draggable';

const Glorp = () => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    isMounted && setIsEnabled(localStorage.getItem('glorp-mode') === 'on');
  }, [isMounted]);

  return (
    <div className={isEnabled ? '' : 'hidden'}>
      <Draggable src="/emojis/glorp.webp" />
    </div>
  );
};

export default Glorp;
