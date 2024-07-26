import React, { useState } from "react";
import CreateModal from "./modals/CreateModal";
import ViewModal from "./modals/ViewModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";

const EventTable: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const handleCreateClick = () => setShowCreateModal(true);
  const handleViewClick = (event: any) => {
    setSelectedEvent(event);
    setShowViewModal(true);
  };
  const handleEditClick = (event: any) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };
  const handleDeleteClick = (event: any) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const events = [
    {
      id: 1,
      name: "Event 1",
      category: "Conference",
      location: "New York",
      description: "This is event 1",
      date: "2024-08-01",
      time: "10:00 AM",
    },
    {
      id: 2,
      name: "Event 2",
      category: "Workshop",
      location: "San Francisco",
      description: "This is event 2",
      date: "2024-09-15",
      time: "2:00 PM",
    },
  ];

  return (
    <div>
      <button
        onClick={handleCreateClick}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Event
      </button>
      <table className="w-full mt-4 bg-white">
        <thead>
          <tr>
            <th className="border p-2">Event Name</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Location</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Time</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, index) => (
            <tr key={index}>
              <td className="border p-2">{event.name}</td>
              <td className="border p-2">{event.category}</td>
              <td className="border p-2">{event.location}</td>
              <td className="border p-2">{event.description}</td>
              <td className="border p-2">{event.date}</td>
              <td className="border p-2">{event.time}</td>
              <td className="border p-2">
                <button
                  onClick={() => handleViewClick(event)}
                  className="bg-gray-500 text-white px-2 py-1 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => handleEditClick(event)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(event)}
                  className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showCreateModal && (
        <CreateModal onClose={() => setShowCreateModal(false)} />
      )}
      {showViewModal && selectedEvent && (
        <ViewModal
          event={selectedEvent}
          onClose={() => setShowViewModal(false)}
        />
      )}
      {showEditModal && selectedEvent && (
        <EditModal
          event={selectedEvent}
          onClose={() => setShowEditModal(false)}
        />
      )}
      {showDeleteModal && selectedEvent && (
        <DeleteModal
          event={selectedEvent}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default EventTable;
