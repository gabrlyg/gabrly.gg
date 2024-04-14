import React, { useEffect, useState } from 'react';
import Draggable from './Draggable';
import { useStore } from '@nanostores/react';
import { isGlorpModeOn } from '../stores/glorpStore';

const Glorp = () => {
  const $isGlorpModeOn = useStore(isGlorpModeOn);

  return (
    <div className={$isGlorpModeOn ? '' : 'hidden'}>
      <Draggable src="/emojis/glorp.webp" />
    </div>
  );
};

export default Glorp;
