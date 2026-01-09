import React from 'react'
import {Search , CircleX } from 'lucide-react'

const Query = ({onclose}) => {


  return (

    <div>

   

    <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-start pt-28 justify-center z-10">
    <div className="w-[40rem] h-14 p-3 pt-6 bg-white border border-gray-300 rounded-lg shadow-lg flex items-center ">
       
       <Search className='mb-4 mr-2' size={20} color='gray'/>
      
      <input
        type="text"
        placeholder="Search for anything"
        className=" w-[90%] rounded-md p-2 border-none focus:outline-none mb-4 font-sans text-gray-800 tracking-wide"
      />
      
      <button onClick={onclose}>

      <CircleX  className='mb-3 cursor-pointer '    />
      </button>
    </div>
  </div>
  </div>
  )
}

export default Query;
