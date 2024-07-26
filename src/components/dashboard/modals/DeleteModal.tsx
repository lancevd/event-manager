import React from "react";

interface DeleteModalProps {
  event: any;
  onClose: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ event, onClose }) => {
  const handleDelete = () => {
    // Handle delete logic here
    onClose(); // Close the modal after deletion
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">Delete Event</h2>
        <p>Are you sure you want to delete this event?</p>
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
  );
};

export default DeleteModal;
