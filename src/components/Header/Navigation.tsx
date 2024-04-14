import React, { useCallback, useEffect, useState } from 'react';
import { isGlorpModeOn } from '../../stores/glorpStore';
import { useStore } from '@nanostores/react';

interface LogoProps {
  darkMode?: boolean;
}

interface NavButtonProps {
  onPress: React.MouseEventHandler<HTMLButtonElement>;
  isExpanded: boolean;
}

interface NavigationMenuProps {
  isExpanded: boolean;
}

interface ToggleProps {
  label: string;
  isOn: boolean;
  toggle: () => void;
}

const Logo: React.FC<LogoProps> = ({ darkMode }) => {
  return (
    <h1 className="w-10 h-10">
      <img src="/assets/logo.svg" />
    </h1>
  );
};

const LinksList: React.FC = () => {
  return (
    <ul className="flex flex-col md:flex-row gap-4 text-lg">
      <li>
        <a href="/keyboard">Keyboard</a>
      </li>
      <li>
        <a href="/resin">Resin</a>
      </li>
    </ul>
  );
};

const NavButtonIcon: React.FC<{ expanded: boolean }> = ({ expanded }) => {
  return (
    <div className="flex flex-col justify-between items-end h-[21px] w-5 overflow-hidden">
      <div
        className={`bg-black h-[1px] w-7 transform transition-all origin-right duration-200 ${expanded ? 'rotate-[-44.25deg]' : ''}`}
      />
      <div
        className={`bg-black h-[1px] w-1/2 transform transition-all origin-right duration-200 ${expanded ? 'translate-x-10' : ''}`}
      />
      <div
        className={`bg-black h-[1px] w-7 transform transition-all origin-right duration-200 ${expanded ? 'rotate-[44.25deg]' : ''}`}
      />
    </div>
  );
};

const NavButton: React.FC<NavButtonProps> = ({ onPress, isExpanded }) => {
  return (
    <button
      className="inline-flex items-center justify-center w-9 h-9 rounded-md active:bg-gray-200 z-[999]"
      onClick={onPress}
    >
      <NavButtonIcon expanded={isExpanded} />
    </button>
  );
};

const Toggle: React.FC<ToggleProps> = ({ label, isOn, toggle }) => {
  const id = `${label.replaceAll(' ', '-')}-toggle`;
  return (
    <div className="flex flex-row gap-4 items-center">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="checkbox"
        className="peer/checkbox hidden"
        checked={isOn}
        onChange={toggle}
      />
      <span
        className={`h-8 w-16 rounded-sm border-[1px] relative border-slate-700 before:toggle-slider peer-checked/checkbox:before:toggle-slider-on`}
        role="checkbox"
        onClick={toggle}
      />
    </div>
  );
};

const NavigationMenu: React.FC<NavigationMenuProps> = ({ isExpanded }) => {
  const $isGlorpModeOn = useStore(isGlorpModeOn);
  const toggleGlorpMode = useCallback(() => {
    if (typeof localStorage !== 'undefined') {
      if (localStorage.getItem('glorp-mode') === 'on') {
        localStorage.setItem('glorp-mode', 'off');
        isGlorpModeOn.set(false);
      } else {
        localStorage.setItem('glorp-mode', 'on');
        isGlorpModeOn.set(true);
      }
    }
  }, [isGlorpModeOn]);

  return (
    <div
      className={`absolute right-2 top-6 border-[1px] bg-slate-100 pt-16 px-4 pb-4 flex items-end flex-col rounded-sm ${isExpanded ? 'border-slate-700 shadow-box-md' : 'hidden'}`}
      aria-hidden={!isExpanded}
    >
      <div className="flex md:hidden">
        <LinksList />
      </div>
      <ul className={`flex flex-col w-full items-end gap-4`}>
        {/* <li>
          <Toggle label="Dark Mode" isOn={false} toggle={() => {}} />
        </li> */}
        <li>
          <Toggle
            label="Glorp"
            isOn={$isGlorpModeOn}
            toggle={toggleGlorpMode}
          />
        </li>
      </ul>
    </div>
  );
};

const Navigation: React.FC = () => {
  const [isSettingsMenuExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const toggleMenu = useCallback(() => {
    setIsExpanded(!isSettingsMenuExpanded);
  }, [isSettingsMenuExpanded, setIsExpanded]);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    isMounted && isGlorpModeOn.set(localStorage.getItem('glorp-mode') === 'on');
  }, [isMounted]);

  return (
    <nav className="w-full flex flex-row justify-between items-center h-24 p-4">
      <Logo />
      <div className="flex flex-row items-center gap-4">
        <div className="hidden md:inline-flex">
          <LinksList />
        </div>
        <NavButton onPress={toggleMenu} isExpanded={isSettingsMenuExpanded} />
      </div>
      <NavigationMenu isExpanded={isSettingsMenuExpanded} />
    </nav>
  );
};

export default Navigation;
