import React, { useState } from "react";

interface EditModalProps {
  event: any;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ event, onClose }) => {
  const [eventData, setEventData] = useState(event);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEventData({ ...eventData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Event Name</label>
            <input
              type="text"
              name="name"
              value={eventData.name}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <input
              type="text"
              name="category"
              value={eventData.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Time</label>
            <input
              type="time"
              name="time"
              value={eventData.time}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
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
