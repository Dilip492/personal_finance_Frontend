import { Plus } from "lucide-react"

const Temp = () => {


    return (

        <div className="flex">

            <div className="bg-white hover:text-white hover:bg-blue-500 text-blue-400  py-1 border-2 border-blue-200 px-4 rounded flex items-center just">
                <Plus size={18} strokeWidth={3} />
                <button className="ml-2 text-lg">Income</button>
            </div>
            
          

        </div>
    )
}


export default Temp;