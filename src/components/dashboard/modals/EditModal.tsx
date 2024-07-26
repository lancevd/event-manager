import axios from "axios";
import React, { useState } from "react";
import { TbX } from "react-icons/tb";


interface EditModalProps {
  event: any;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ event, onClose }) => {
  const [eventData, setEventData] = useState(event);
   const [message, setMessage] = useState<string>("");
   const [success, setSuccess] = useState<boolean | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", eventData.name);
    formData.append("location", eventData.location);
    formData.append("date", eventData.date);
    formData.append("time", eventData.time);
    formData.append("description", eventData.description);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}api/events/${event._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log(response)
      if (response.status === 200) {
        setMessage("Event Updated successfully");
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error updating event");
      setSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-950 bg-opacity-50">
      <div className=" w-[90%] h-[80vh] overflow-y-auto md:h-fit lg:w-3/5 text-gray-400 bg-gray-800 pb-4 px-4 sm:px-8 rounded transition-all">
        <div className="flex mb-4 border-b justify-between border-gray-500 items-center">
          <h2 className="text-xl text-center">Edit Event</h2>
          <div
            onClick={onClose}
            className="p-1 hover:bg-red-600 rounded hover:text-white"
          >
            <TbX className="text-2xl" />
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="My Event"
                required
                value={eventData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Roadblock, Akure"
                required
                value={eventData.location}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={eventData.date}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
                value={eventData.time}
                onChange={handleChange}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Write event description here"
                value={eventData.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>
          {message && (
            <p
              className={`my-4 text-center text-white w-full ${
                success ? "bg-green-700" : "bg-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <button
            type="submit"
            className="text-white border inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Update Event
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
