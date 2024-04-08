import React, { useState, type MouseEventHandler } from 'react';
import NavLink from './NavLink';

const BurgerMenu: React.FC<{}> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onPress: MouseEventHandler<HTMLButtonElement> = () => {
    isExpanded ? collapse() : expand();
  };

  const collapse = () => setIsExpanded(false);
  const expand = () => setIsExpanded(true);

  return (
    <div
      className={`${!isExpanded ? 'bg-white/90 backdrop-blur-xl' : ''} flex w-full items-center justify-center`}
    >
      <nav className="max-w-2xl w-full flex justify-center items-center flex-col sm:flex-row">
        <div className="h-24 flex flex-row justify-between items-center p-4 flex-wrap sm:flex-nowrap w-full">
          <h1 className="text-2xl font-bold">
            <a href="/">GABRLYG</a>
          </h1>
          <button
            className="inline-block sm:hidden w-9 h-9 rounded-md active:bg-gray-200 z-[999]"
            onClick={onPress}
          >
            <img src="/burger-menu.svg" />
          </button>
          <ul className="hidden sm:flex flex-row gap-4">
            <li>
              <a href="/keyboard">Keyboard</a>
            </li>
            <li>
              <a href="/resin">Resin</a>
            </li>
          </ul>
        </div>
        {isExpanded && (
          <>
            <ul className="flex flex-col gap-4 p-4 w-full z-40">
              <NavLink href="/keyboard">Keyboard</NavLink>
              <NavLink href="/resin">Resin</NavLink>
            </ul>
            <div className="fixed inset-0 -z-10 bg-white/90 backdrop-blur-xl"></div>
          </>
        )}
      </nav>
    </div>
  );
};

export default BurgerMenu;
