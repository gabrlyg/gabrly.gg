import React, { type ReactNode } from 'react';

interface Props {
  href: string;
  children: ReactNode;
}

const NavLink: React.FC<Props> = ({ href, children }) => {
  return (
    <li>
      <a href={href} className="text-2xl sm:text-base">
        {children}
      </a>
    </li>
  );
};

export default NavLink;
