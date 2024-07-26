import axios from "axios";
import React, { useState } from "react";

interface DeleteModalProps {
  event: any;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ event, onClose }) => {
  const [message, setMessage] = useState<string>("");
   const [success, setSuccess] = useState<boolean | null>(null);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}api/events/${event._id}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setMessage("Event deleted successfully");
        setSuccess(true);
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setMessage("Error deleting event");
      setSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000] bg-gray-950 bg-opacity-50">
      <div className=" w-[90%] lg:max-h-[80vh] overflow-y-auto md:h-fit lg:w-3/5 text-gray-400 bg-gray-800 pb-4 px-4 sm:px-8 rounded transition-all">
        <div className="flex flex-col gap-4 items-center">
          <h2 className="text-xl mb-4">Delete Event</h2>
          <p>Are you sure you want to delete this event?</p>
          {message && (
            <p
              className={`my-4 text-center text-white w-full ${
                success ? "bg-green-700" : "bg-red-500"
              }`}
            >
              {message}
            </p>
          )}
          <div className="flex justify-center gap-6">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded mt-4 ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
