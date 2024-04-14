import React from 'react';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header: React.FC = () => {
  return (
    <header className="w-full sticky left-0 top-0 right-0 flex flex-row justify-center bg-white border-b-[1px]">
      <BurgerMenu />
    </header>
  );
};

export default Header;
