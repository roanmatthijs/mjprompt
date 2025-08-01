import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 bg-base-bg/80 backdrop-blur-md z-30">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-lg logo-gradient"></div>
          <h1 className="text-xl font-bold text-gray-100 tracking-wide">Midjourney V7 Prompt Architect</h1>
        </div>
      </div>
      <div className="holographic-divider"></div>
    </header>
  );
};

export default Header;