import React from "react";
import { MdMenu } from "react-icons/md";

interface DashboardNavProps {
  onToggleSidebar: () => void;
}

const DashboardNav: React.FC<DashboardNavProps> = ({ onToggleSidebar }) => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
      <div className="flex flex-wrap justify-between items-center">
        <div className="flex justify-start items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer block md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <MdMenu />
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <a href="/" className="flex items-center justify-between mr-4">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Eventer
            </span>
          </a>
        </div>
        <div className="flex items-center lg:order-2">
          <button
            type="button"
            className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1721998818~exp=1721999418~hmac=05bd7ba64e59402ca4d58a253e6c1f92faae0b47d56d7f6986122692ef675b28"
              alt="user photo"
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
