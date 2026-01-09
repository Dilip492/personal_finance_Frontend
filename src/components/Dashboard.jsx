import React, { useState } from 'react';
import { FinancialOverview } from './FinancialOverview';
import { TransactionList } from './TransactionsList';
import { Investment } from './Investment';
// import Navbar from './Navbar';
import { ChevronDown, Plus , Bell } from 'lucide-react';



const Dashboard = () => {

  const [isOpen, setIsOpen] = useState(false);

  // Toggle the dropdown
  const toggleDropdown = () => setIsOpen(!isOpen);






  return (

    <div className='flex justify-center items-center'>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">

        <div className="col-span-1 md:col-span-2 w-[55rem] mt-4 ">
          <FinancialOverview />

        </div>
        <div>

          <TransactionList />
        </div>

        <div>

          <Investment />
        </div>



      </div>


      {/* Option button  */}

      <div className="absolute inline-block text-left right-10 top-24">
        {/* Dropdown Button */}
        <button

          onClick={toggleDropdown}

          className="inline-flex justify-between items-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          Options
          <ChevronDown className="ml-2 h-5 w-5" />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
          >
            <div className="py-1">
              <button
                onClick={() => alert("Option 1 clicked")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Option 1
              </button>
              <button
                onClick={() => alert("Option 2 clicked")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Option 2
              </button>
              <button
                onClick={() => alert("Option 3 clicked")}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              >
                Option 3
              </button>
            </div>
          </div>
        )}
      </div>


      {/* adding income button  */}

      <div className="flex absolute right-44 top-24">

        <div className="bg-white hover:text-white hover:bg-blue-500 text-blue-400  py-1 border-2 border-blue-200 px-4 rounded flex items-center just">
          <Plus size={18} strokeWidth={3} />
          <button className="ml-2 text-lg">Income</button>
        </div>



      </div>


      {/* side container */}

      <div>

        <div class="h-auto w-72 bg-white shadow-md rounded-md absolute right-4 top-[10rem]">
          <p>Hi</p>
        </div>

      </div>

    </div>
  );
}


export default Dashboard;