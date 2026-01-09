import React, { useState } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarLink from './SidebarLink';
import { mainLinks, bottomLinks } from './sidebarConfig';
import Navbar from './Navbar';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);

  return (
   <div>

    <Navbar/>   
    <aside className={`
      hidden md:block
      h-screen
      ${expanded ? 'w-60' : 'w-16'}
      bg-white
      dark:bg-gray-800
      border-r
      border-gray-200
      dark:border-black
      fixed
      left-0
      top-0
      transition-all
      duration-300
      ease-in-out
      flex
      flex-col
      p-4
      shadow-sm
    `}>
      <SidebarHeader 
        expanded={expanded} 
        onToggle={() => setExpanded(!expanded)} 
      />

      <nav className="flex-1">
        <ul className="space-y-2">
          {mainLinks.map((link, index) => (
            <SidebarLink
              key={index}
              {...link}
              expanded={expanded}
            />
          ))}
        </ul>
      </nav>

      <div className="border-t border-gray-200 dark:border-black pt-4">
        <ul className="space-y-2">
          {bottomLinks.map((link, index) => (
            <SidebarLink
              key={index}
              {...link}
              expanded={expanded}
            />
          ))}
        </ul>
      </div>
    </aside>
    </div>
  );
}