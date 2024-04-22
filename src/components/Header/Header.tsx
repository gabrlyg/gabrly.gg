import React from 'react';
import Navigation from './Navigation';

interface Props {
  isHomePage?: boolean;
}

const Header: React.FC<Props> = ({ isHomePage }) => {
  return (
    <header
      className={`w-full ${isHomePage ? '' : 'sticky'} left-0 top-0 right-0 flex flex-row justify-center bg-slate-100 z-[998]`}
    >
      <Navigation isHomePage={isHomePage} />
    </header>
  );
};

export default Header;
