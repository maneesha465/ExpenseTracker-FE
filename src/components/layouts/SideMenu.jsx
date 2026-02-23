import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA } from '../../utils/data';
import { CharAvatar } from '../cards/CharAvatar';
import { LuUpload } from "react-icons/lu";
import { useRef, useState } from "react";
import { FiEdit2 } from "react-icons/fi"; // pencil icon

export const SideMenu = ({activeMenu}) => {

  const {user, clearUser} = useContext(UserContext);

const inputRef = useRef(null);
const [preview, setPreview] = useState(user?.profileImageUrl || null);


 const navigate = useNavigate();

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const url = URL.createObjectURL(file);
    setPreview(url);
  }
};

    
   

    // const handleClick = (route) => {
    //     if(route === "logout") {
    //         handleLogout();
    //         return;
    //     }
    const handleClick = (route, label) => {
  if (label.toLowerCase() === "logout") {
    handleLogout();
    return;
  }
        navigate(route);
    };

    const handleLogout = () => {
        // localStorage.clear();
        // clearUser();
         // Clear stored auth data (localStorage/sessionStorage/cookies)
    localStorage.removeItem("token"); 
    localStorage.removeItem("user"); 
        navigate("/login");
    };
  return (
    <div className='w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20' >
        {/* <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
            {user?.profileImageUrl ?(
                <img src={user?.profileImageUrl ||" "}
                alt="Profile Image" 
                className='w-20 h-20 bg-slate-400 rounded-full'/>):(
                <CharAvatar 
                fullName={user ?. fullName}
                width="w-20"
                height="h-20"
                style="text-xl"
                />)}
            <h5 className='text-gray-950 font-medium leading-6'>
                {user ?. fullName || ""}
            </h5>
           
        </div> */}
       <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7 relative">

  <input
    type="file"
    accept="image/*"
    ref={inputRef}
    onChange={handlePhotoChange}
    className="hidden"
  />

  {/* Profile Circle */}
  <div className="relative">
    {!preview ? (
      <CharAvatar
        fullName={user?.fullName}
        width="w-20"
        height="h-20"
        style="text-xl"
      />
    ) : (
      <img
        src={preview}
        className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
        alt="profile"
      />
    )}

    {/* Pencil Icon Button */}
    <button
      onClick={() => inputRef.current.click()}
      className="absolute bottom-0 right-0 bg-white border border-gray-300 p-1 rounded-full shadow hover:bg-gray-100 transition"
    >
      <FiEdit2 className="text-gray-600 text-sm" />
    </button>
  </div>

  <h5 className="text-gray-950 font-medium leading-6">
    {user?.fullName || ""}
  </h5>

</div>

        {SIDE_MENU_DATA.map((item, index) =>(
            <button 
  key={`menu_${index}`}
  className={`w-full flex items-center gap-4 text-[15px] ${
    activeMenu === item.label ? "text-black bg-primary" : ""
  } py-3 lg:py-6 rounded lg:mb-3 hover:bg-blue-100 transition-colors duration-200`}
  onClick={() => handleClick(item.path,item.label)}
>
  {/* Button content here */}
  <item.icon className='text-xl'/>
  {item.label}
</button>

        ))}
    </div>
  )
}
