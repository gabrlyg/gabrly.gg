import React, { useState, type MouseEventHandler } from 'react';
import NavLink from './NavLink';

const Icon: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  return (
    <div className="flex flex-col justify-between items-end h-[21px] w-5 overflow-hidden">
      <div
        className={`bg-black h-[1px] w-7 transform transition-all origin-right duration-300 ${expanded ? 'rotate-[-44.25deg]' : ''}`}
      />
      <div
        className={`bg-black h-[1px] w-1/2 transform transition-all origin-right duration-300 ${expanded ? 'translate-x-10' : ''}`}
      />
      <div
        className={`bg-black h-[1px] w-7 transform transition-all origin-right duration-300 ${expanded ? 'rotate-[44.25deg]' : ''}`}
      />
    </div>
  );
};

const BurgerMenu: React.FC<{}> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const onPress: MouseEventHandler<HTMLButtonElement> = () => {
    isExpanded ? collapse() : expand();
  };

  const collapse = () => setIsExpanded(false);
  const expand = () => setIsExpanded(true);

  return (
    <div className="flex w-full items-center justify-center">
      <nav className="max-w-2xl w-full flex justify-center items-center flex-col sm:flex-row">
        <div className="h-24 flex flex-row justify-between items-center p-4 flex-wrap sm:flex-nowrap w-full">
          <h1 className="text-2xl font-bold">
            <a href="/">
              <img className="w-10 h-10" src="/assets/favicon.svg" />
            </a>
          </h1>
          <button
            className="inline-flex items-center justify-center sm:hidden w-9 h-9 rounded-md active:bg-gray-200 z-[999]"
            onClick={onPress}
          >
            <Icon expanded={isExpanded} />
            {/* <img src="/burger-menu.svg" /> */}
          </button>
          <ul className="hidden sm:flex flex-row gap-4 text-lg">
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
