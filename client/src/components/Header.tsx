import React from "react";
import { useAppSelector } from "../app/hooks";
import { Link } from "react-router-dom";
import avatar from "../assests/profile.png";
const Header = () => {
  const {currentUser} = useAppSelector(state=>state.user);
  console.log('curr-',currentUser)
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img src={currentUser.image ? `http://localhost:5000/profilePic/${currentUser.image}` : avatar} className="h-7 w-7 rounded-full object-cover" alt="avatar" />
            ):(
              <li>Sign in</li>
            )}
           
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
