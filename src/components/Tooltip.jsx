import React from 'react'

const Tooltip = ({text , children }) => {
    return (
        <div>

            <div className="relative inline-block group">
                {/* Tooltip Trigger */}
                {children}
                {/* Tooltip Content */}
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 w-max bg-gray-800 text-white text-md rounded shadow-lg px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    {text}
                </div>
            </div>

        </div>
    )
}

export default Tooltip
