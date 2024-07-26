import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdMenu } from "react-icons/md";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "#" },
    { name: "Contact", path: "#" },
  ];

  // Get token and userId from local storage
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("userId");

  useEffect(() => {
    if (token && user) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [token, user]);

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white border-gray-200 py-2.5 dark:bg-gray-800">
      <nav className="contain mx-auto flex flex-wrap justify-between items-center">
        <a href="/" className="flex items-center">
          <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
            Eventer
          </span>
        </a>
        <div className="flex items-center lg:order-2">
          <Link
            to={isLoggedIn ? "/dashboard" : "/login"}
            className="text-gray-800 border dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-xs sm:text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
          >
            {isLoggedIn ? "Dashboard" : "Log in"}
          </Link>
          <Link
            to={"/create-event"}
            className={`text-white border bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs sm:text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800 ${
              isLoggedIn ? "" : "hidden"
            }`}
          >
            Create Event
          </Link>
          <button
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded={isMenuOpen}
            onClick={handleToggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <MdMenu className="text-2xl" />
          </button>
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
          id="mobile-menu-2"
        >
          <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
