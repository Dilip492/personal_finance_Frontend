import React from 'react';
import { ChevronLeft, Menu } from 'lucide-react';
import logo from '../images/logo.png'
import logo_white from '../images/logo-white.png'
export default function SidebarHeader({ expanded, onToggle }) {
  return (
    <div className="flex items-center justify-between mb-8">
      {expanded && (
        <div>
          <img className="w-[200px] pr-2 dark:hidden " src={logo} alt='img'></img>

          <img className="w-[200px] pr-2 hidden dark:block " src={logo_white} alt='img2'></img>
        </div>
      )}

    </div>
  );

}