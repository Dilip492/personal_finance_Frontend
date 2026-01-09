import React, { useState} from 'react'
import {
    
    Mail,
    Edit2,
    Camera,
    Lock,
    Bell,
    CreditCard,
    LogOut,
    ChevronRight,
    Save
} from 'lucide-react';
// import UserContext from '../Context/UserContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../Context/UserContextProvider';


const Profile = () => {
    const { SetisAuthenticate} = useAuth();
    const navigate = useNavigate();

    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        name: 'Alex Thompson',
        email: 'alex.thompson@example.com',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&h=300&q=80'
    });

    const menuItems = [
        { icon: Lock, label: 'Security Settings', badge: 'New' },
        { icon: Bell, label: 'Notifications' },
        { icon: CreditCard, label: 'Payment Methods' },
    ];

    const handleSave = () => {
        setIsEditing(false);
        // Here you would typically save the changes to your backend
    };

    const handlelogout = ()=>{
        toast.success("User logout successfully")
    SetisAuthenticate(false)
    navigate("/")
    }
    return (
        <div>
            <div className='h-[80vh] w-[80wh] ml-60  items-center'>

                <div className="min-h-screen bg-gray-50">
                    <div className="max-w-3xl mx-auto px-4 py-12">
                        {/* Profile Header */}
                        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                            <div className="h-32 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                            <div className="px-6 pb-6">
                                <div className="relative -mt-16 mb-4">
                                    <div className="relative">
                                        <img
                                            src={userData.avatar}
                                            alt="Profile"
                                            className="w-32 h-32 rounded-full border-4 border-white shadow-md object-cover"
                                        />
                                        <button
                                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                                            onClick={() => {/* Handle avatar update */ }}
                                        >
                                            <Camera className="w-5 h-5 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={userData.name}
                                                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                                                className="text-2xl font-bold mb-1 px-2 py-1 border rounded"
                                            />
                                        ) : (
                                            <h1 className="text-2xl font-bold mb-1">{userData.name}</h1>
                                        )}
                                        <div className="flex items-center text-gray-600">
                                            <Mail className="w-4 h-4 mr-2" />
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    value={userData.email}
                                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                                    className="px-2 py-1 border rounded"
                                                />
                                            ) : (
                                                <span>{userData.email}</span>
                                            )}
                                        </div>
                                    </div>
                                    {isEditing ? (
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                                        >
                                            <Save className="w-4 h-4 mr-2" />
                                            Save Changes
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit Profile
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Menu Options */}
                        <div className="bg-white rounded-2xl shadow-sm mt-6 overflow-hidden">
                            {menuItems.map((item, index) => (
                                <button
                                    key={index}
                                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b last:border-b-0 border-gray-100"
                                >
                                    <div className="flex items-center">
                                        <item.icon className="w-5 h-5 text-gray-500 mr-3" />
                                        <span className="font-medium">{item.label}</span>
                                        {item.badge && (
                                            <span className="ml-2 px-2 py-1 bg-emerald-100 text-emerald-600 text-xs rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>

                        {/* Logout Button */}
                        <button onClick={handlelogout} className="w-full mt-6 px-6 py-4 bg-white rounded-2xl shadow-sm flex items-center justify-center text-red-500 hover:bg-gray-50 transition-colors">
                            <LogOut className="w-5 h-5 mr-2" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Profile
