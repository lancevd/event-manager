import React, { useEffect, useState } from "react";
import { MdEventNote, MdLogout, MdSupervisedUserCircle } from "react-icons/md";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidenav"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
        <ul className="pt-5 mt-5 space-y-2 dark:border-gray-700">
          <li>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <MdEventNote />
              <span className="ml-3">Events</span>
            </a>
          </li>
          <li className={`${isAdmin ? "block" : "hidden"}`}>
            <a
              href="#"
              className="flex items-center p-2 text-base font-medium text-gray-900 rounded-lg transition duration-75 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white group"
            >
              <MdSupervisedUserCircle />
              <span className="ml-3">Users</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="absolute bottom-0 left-0 justify-center p-4 space-x-4 w-full md:flex bg-white dark:bg-gray-800 z-20">
        <button
          onClick={logOut}
          className="bg-red-500 w-full rounded-lg flex gap-4 justify-center items-center text-gray-100 py-1"
        >
          Logout
          <span>
            <MdLogout />
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
