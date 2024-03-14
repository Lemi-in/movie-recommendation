  import React, { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  import { UserAuth } from "../context/AuthContext";
  import Logo  from '../images/logo.png'
  import {FaSearch} from "react-icons/fa"

  const Navbar = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [showSearchForm,setShowSearchForm]=useState(false);

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

   const handleSearchButtonClick = () => {
        setShowSearchForm(true);
   }
    return (
      <div className="flex items-center justify-between p-2 z-[100] w-full absolute backdrop-filter backdrop-blur-lg bg-opacity-50 bg-gray-900">
        <Link to="/">
          <img className='h-11 w-40' src={Logo} alt=".." />
        </Link>
        <div className="flex">
        {showSearchForm && (
         <form onSubmit={handleSearch} className="flex">
                <input
                  type="text"
                  name="search"
                  autoComplete="off"
                  id="search-navbar"
                  className="block w-full p-2 text-sm text-gray-900 border-b border-gray-300 bg-transparent  dark:text-white dark:border-gray-600 dark:bg-transparent dark:placeholder-gray-400"
                  placeholder="Search..."
                />
            <button type="submit" className="p-2">
              <FaSearch className="text-white"/>
            </button>
        </form>
          )}
          {!showSearchForm && (
          <button
            onClick={handleSearchButtonClick}
            className="p-2"
          >
            <FaSearch className="text-white" />
          </button>
        )}
        </div>
          
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
