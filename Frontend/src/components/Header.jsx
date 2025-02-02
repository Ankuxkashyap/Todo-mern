import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../main";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  console.log(isAuthenticated);

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Clear token from cookies
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Clear token from localStorage (if used)
    localStorage.removeItem("isAuthenticated");
    console.log("User logged out");
  };

  return (
    <div className="h-15 flex justify-between items-center bg-gray-700">  
      <h2 className="text-3xl font-bold m-2 text-red-700">Todo.</h2>
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" type="button"  onClick={handleLogout}>
            Log out
          </button>
        ):(
          <>
            <Link className="bg-blue-500  hover:bg-blue-600 text-white font-bold py-2 px-4 mx-3 rounded " to ="/singup">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;