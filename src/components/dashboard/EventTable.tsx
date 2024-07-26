import React, { useEffect, useState } from "react";
import CreateModal from "./modals/CreateModal";
import ViewModal from "./modals/ViewModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import axios from "axios";


interface Event {
  _id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

const EventTable: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false)

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

  // const events = [
  //   {
  //     id: 1,
  //     name: "Event 1",
  //     category: "Conference",
  //     location: "New York",
  //     description: "This is event 1",
  //     date: "2024-08-01",
  //     time: "10:00 AM",
  //   },
  //   {
  //     id: 2,
  //     name: "Event 2",
  //     category: "Workshop",
  //     location: "San Francisco",
  //     description: "This is event 2",
  //     date: "2024-09-15",
  //     time: "2:00 PM",
  //   },
  // ];

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/events/myevents`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status ===200) {
          setEvents(response.data);
          console.log(response);
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="contain ">
      <button
        onClick={handleCreateClick}
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm py-2 px-3 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white border "
      >
        Add Event
      </button>
      <div className="overflow-x-auto">
        <table className="w-full mt-4 bg-gray-800 text-gray-400 text-xs md:text-sm lg:text-base">
          <thead className="bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-2">Event Name</th>
              <th className="p-2">Location</th>
              <th className="p-2">Description</th>
              <th className="p-2">Date</th>
              <th className="p-2">Time</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {!events ? "Loading..." : events.map((event, index) => (
              <tr key={index} className="border-b border-gray-600 py-1">
                <td className="py-2 pl-3">{event.name}</td>
                <td className="p-2">{event.location}</td>
                <td className="p-2">{event.description.slice(0,20)}</td>
                <td className="p-2">{event.date}</td>
                <td className="p-2">{event.time}</td>
                <td className="p-2 flex flex-col lg:flex-row gap-1">
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
      </div>
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
