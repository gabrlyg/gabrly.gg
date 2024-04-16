import React from 'react';

interface LogoProps {
  darkMode?: boolean;
}

const Logo: React.FC<LogoProps> = ({ darkMode }) => {
  // return <img src="/assets/logo.svg" className="stroke-red-700" />;
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth={9.43}
      className={darkMode ? 'stroke-slate-200' : 'stroke-slate-900'}
    >
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M150,18.5L40,84L40,214.5L150,281.5L261,214.5L261,190.5L193.5,150.5L261,107L261,84L150,18.5Z" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M150,40.5L222,84L150.5,127.5L76,84L150,40.5Z" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M97.408,96.5L150,64.5L202,96.5" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M149.704,40.5L150,64.5" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M40,84L222,191L169.5,221.5" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M261,191L169.5,244.5L169.5,183.929" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M150,278.61L150,173L199.5,202.537" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M60,119.463L129.5,162L129.5,244.5L60,203L60,119.463Z" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M78.665,130.182L78.665,192.5L129.5,222.463" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M60,202.537L78.665,192.5" />
      </g>
      <g transform="matrix(1,0,0,1.06084,-0.5,-9.12548)">
        <path d="M261,84L173,138L261,191" />
      </g>
    </svg>
  );
};

export default Logo;
