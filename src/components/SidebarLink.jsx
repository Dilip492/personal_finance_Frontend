
import React from 'react';

import { Link } from 'react-router-dom';

export default function SidebarLink({ icon, label, notifications, expanded , location }) {
    return (
        <li>
            <Link
                to={location}
                className={`
          flex items-center gap-x-4 p-2 rounded-lg
          text-gray-600 hover:bg-gray-50 dark:hover:bg-black hover:text-gray-900 dark:hover:text-white
          transition-colors relative group
        `}
            >
                <span className="min-w-[24px] dark:text-white">{icon}</span>
                {expanded && (
                    <span className="text-sm font-medium dark:text-white">{label}</span>
                )}
                {notifications && (
                    <span className={`
            ${expanded ? 'right-2' : 'right-0'}
            absolute
            bg-blue-500
            text-white
            dark:text-black
            text-x
            
            px-2
            py-0.25
            rounded-full
            min-w-[10px]
            text-center
           
          `}>
                        {notifications}
                    </span>
                )}
                {!expanded && (
                    <div className="
            absolute left-full ml-6 
            bg-gray-800 text-white px-2 py-1 rounded
            text-sm whitespace-nowrap
            opacity-0 group-hover:opacity-100
            pointer-events-none
            transition-opacity
          ">
                        {label}
                    </div>
                )}
            </Link>
        </li>
    );
}