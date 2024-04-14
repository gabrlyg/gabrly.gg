import React from 'react';
import BurgerMenu from './BurgerMenu/BurgerMenu';

const Header: React.FC = () => {
  return (
    <header className="w-full sticky left-0 top-0 right-0 flex flex-row justify-center bg-slate-100">
      <BurgerMenu />
    </header>
  );
};

export default Header;
