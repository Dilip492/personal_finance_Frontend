import { User, LogOut, Settings, HelpCircle, Bell, Search, CircleUserRound } from "lucide-react";
import { useContext, useState } from "react";
import logo from '../images/logo.png'
import Query from "./Query";
// import UserContext from "../Context/UserContext";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Context/UserContextProvider";
import API_ENDPOINTS from "../config/apiConfig";
const Navbar = () => {

  const { SetisAuthenticate } = useAuth();

  const [showSearchBox, setshowSearchBox] = useState(false)
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const handlelogout = async () => {

    try {
      const response = await fetch(API_ENDPOINTS.LOGOUT, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        // console.log(data);
        toast.success(data.message)
        window.location.reload();
        SetisAuthenticate(null)
        navigate("/")
    
      }

    } catch (error) {

      console.error(error)

    }



  }

  return (
    <div>



      {showSearchBox && <Query onclose={() => setshowSearchBox(false)} />}

      <nav className=" hidden md:block text-black shadow-sm dark:bg-gray-800 ">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between">
          <img className="w-[200px] pr-2" alt="" />
          {/* Logo */}


          {/* Nav Links */}
          <div className=" md:flex space-x-6">
            <Link to="/" className="dark:text-white hover:text-gray-300 dark:hover:text-gray-400 ">
              Overview
            </Link>
            <Link to="/about" className="dark:text-white hover:text-gray-300 dark:hover:text-gray-400">
              Transactions
            </Link>
            <Link to="/services" className=" dark:text-white hover:text-gray-300 dark:hover:text-gray-400">
              Payments
            </Link>
            <Link to="/contact" className="dark:text-white hover:text-gray-300 dark:hover:text-gray-400">
              Settings
            </Link>
          </div>






          {/* User Icon with Dropdown */}
          <div className="relative flex space-x-4   ">
            <button >
              <span className="absolute -top-1 left-3 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">1</span>
              <Bell  className="w-6 h-6 pt-1 text-[#585656] dark:text-white" />

            </button>

            <button >
              <Search onClick={() => setshowSearchBox(true)}  className="w-6 h-6 pt-1 text-[#585656] dark:text-white" />
            </button>

            <button
              className="flex items-center space-x-4 border rounded-full"

              onClick={toggleDropdown}
            >

              <User  className="w-6 h-6 text-[#585656] dark:text-white" />
              {/* <CircleUserRound color="#585656"  className="w-6 h-6" /> */}

            </button>
            {/* Search Dropdown menu */}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 dark:bg-gray-700 bg-white text-gray-700 rounded-lg shadow-xl z-10 top-6 border-2 ">
                <Link
                  to="/profile"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-black"
                  onClick={toggleDropdown}
                >
                  <User className="w-4 h-4 mr-2 dark:text-white" />
                  <span className="dark:text-white">Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-black dark:text-white"
                  onClick={toggleDropdown}
                >
                  <Settings className="w-4 h-4 mr-2 dark:text-white" /> <span className="dark:text-white">Settings</span>
                </Link>
                <Link
                  to="/helpcenter"
                  className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-black dark:text-white"
                  onClick={toggleDropdown}
                >
                  <HelpCircle className="w-4 h-4 mr-2" /> Help
                </Link>
                <button
                  onClick={handlelogout}
                  className="flex items-center px-4 py-2 dark:text-white dark:hover:bg-black hover:bg-gray-100 w-full text-left"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Log Out
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Placeholder */}
        <div className="md:hidden">
          <button className="text-white hover:text-gray-300 px-4 py-2">
            Menu
          </button>
        </div>
      </nav>
    </div>
  );
};


export default Navbar;