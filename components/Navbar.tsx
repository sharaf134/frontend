
import React from 'react';
import { ShieldCheck, Moon } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full h-16 bg-[#0a0a0c] border-b border-gray-800 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <button className="p-2 text-gray-400 hover:text-white transition-colors">
          <Moon size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-white font-bold text-xl tracking-tight">
          SHARAF <span className="text-blue-500">AI</span>
        </span>
        <div className="bg-blue-600 p-1.5 rounded-lg">
          <ShieldCheck size={20} className="text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
