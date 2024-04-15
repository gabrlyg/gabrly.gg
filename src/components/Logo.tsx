import React from 'react';

interface LogoProps {
  darkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ darkMode }) => {
  return <img src="/assets/logo.svg" />;
};

export default Logo;
