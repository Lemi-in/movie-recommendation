  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { UserAuth } from "../context/AuthContext";
  import Logo  from '../images/logo.png'

  const Navbar = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");

    const handleLogOut = async () => {
      try {
        await logOut();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    };

    function handleSearch(event) {
      event.preventDefault();
      const queryTerm = event.target.search.value;
      event.target.reset();
      navigate(`?q=${queryTerm}`);
    }

    return (
      <div className="flex item-center justify-between p-4 z-[100] w-full absolute">
        <Link to="/">
          <img className='h-14 w-40' src={Logo} alt=".." />
        </Link>
        <form onSubmit={handleSearch}>
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  id="search-navbar"
                  className="block w-full p-2 text-sm text-gray-900 border-b border-gray-300 bg-transparent focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:border-gray-600 dark:bg-transparent dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
        </form>
          
        {user?.email ? (
          <div>
            <Link to="/account">
              <button className="text-[#FFFDE3] pr-4">Account</button>
            </Link>

            <button
              onClick={handleLogOut}
              className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-[#00204a] "
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signIn">
              <button className="text-[#FFFDE3] pr-4">Sign In</button>
            </Link>
            <Link to="/signUp">
              <button className="text-[#FFFDE3] px-6 py-2 rounded cursor-pointer bg-cyan-600 ">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    );
  };

  export default Navbar;
