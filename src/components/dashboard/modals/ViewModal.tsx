import React from "react";

interface ViewModalProps {
  event: any;
  onClose: () => void;
}

const ViewModal: React.FC<ViewModalProps> = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">View Event</h2>
        <p>
          <strong>Name:</strong> {event.name}
        </p>
        <p>
          <strong>Category:</strong> {event.category}
        </p>
        <p>
          <strong>Location:</strong> {event.location}
        </p>
        <p>
          <strong>Description:</strong> {event.description}
        </p>
        <p>
          <strong>Date:</strong> {event.date}
        </p>
        <p>
          <strong>Time:</strong> {event.time}
        </p>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white px-4 py-2 rounded mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewModal;
