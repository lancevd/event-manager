import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <a
          href="/"
          className="text-center text-2xl w-fit font-semibold text-gray-900 dark:text-white"
        >
          Eventer
        </a>
        <p className="my-6 text-gray-500 dark:text-gray-400">
          Create, edit, delete, manage your events. Get updated on events in
          your surroundings.
        </p>
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              About
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Company
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              FAQs
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Contact
            </a>
          </li>
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024 &nbsp;Eventer™&nbsp; | All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
