import React, { useState } from "react";
import { TbCalendarMonth, TbClock, TbX } from "react-icons/tb";

interface ViewModalProps {
  event: any;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ event, onClose }) => {
  const inputDate = new Date(event.date);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-950 bg-opacity-50">
      <div className=" w-[90%] h-[80vh] lg:max-h-[80vh] overflow-y-auto md:h-fit lg:w-3/5 text-gray-400 bg-gray-800 pb-4 px-4 sm:px-8 rounded transition-all">
        <div className="flex mb-4 border-b justify-between border-gray-500 items-center">
          <h2 className="text-xl text-center">Event Details</h2>
          <div
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded hover:text-white cursor-pointer"
          >
            <TbX className="text-2xl" />
          </div>
        </div>
        <dl>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            <img
              className="lg:h-56 md:h-44 w-full object-cover object-center"
              src={event.image}
              alt="event"
            />
            <br />
            {event.name}
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {event.description}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Location:
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            {event.location}
          </dd>
          <dt className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
            Date & Time:
          </dt>
          <dd className="mb-4 font-light text-gray-500 sm:mb-5 dark:text-gray-400">
            <div className="flex items-center gap-4">
              <TbCalendarMonth />
              {formattedDate}
            </div>
            <div className="flex items-center gap-4">
              <TbClock /> {event.time}
            </div>
          </dd>
        </dl>
        <div className="flex justify-end items-center">
          <button
            type="button"
            onClick={onClose}
            className="text-white border inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
