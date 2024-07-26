import React, { useEffect, useState } from "react";
import CreateModal from "./modals/CreateModal";
import ViewModal from "./modals/ViewModal";
import EditModal from "./modals/EditModal";
import DeleteModal from "./modals/DeleteModal";
import axios from "axios";
import Spinner from "../Spinner";

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
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false); // New state to trigger refresh

  const handleCreateClick = () => setShowCreateModal(true);
  const handleViewClick = (event: Event) => {
    setSelectedEvent(event);
    setShowViewModal(true);
  };
  const handleEditClick = (event: Event) => {
    setSelectedEvent(event);
    // console.log(event);
    setShowEditModal(true);
  };
  const handleDeleteClick = (event: Event) => {
    setSelectedEvent(event);
    setShowDeleteModal(true);
  };

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const endpoint =
          role === "admin"
            ? `${process.env.REACT_APP_BASE_URL}api/events`
            : `${process.env.REACT_APP_BASE_URL}api/events/myevents`;

        const response = await axios.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setEvents(response.data);
          // console.log(response);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [token, refresh]); // Dependency on token and refresh state

  // Refresh events when user adds a new one
  const handleEventCreated = () => {
    setShowCreateModal(false);
    setRefresh(!refresh);
  };

  // Refresh events after updates
  const handleEventUpdated = () => {
    setShowEditModal(false);
    setRefresh(!refresh);
  };

  // Refresh events after one is deleted
  const handleEventDeleted = () => {
    setShowDeleteModal(false);
    setRefresh(!refresh);
  };

  return (
    <div className="contain">
      <div className="flex justify-between gap-4 text-gray-400 bg-transparent   rounded-lg text-sm py-2 px-3 ml-auto items-center dark:bg-gray-800 ">
        <h3 className="text-xl">All Events</h3>
        <button
          onClick={handleCreateClick}
          className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 focus:outline-none dark:focus:ring-primary-800"
        >
          Add Event
        </button>
      </div>
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
            {loading ? (
              <tr className="w-full justify-center">
                <td colSpan={6} className="text-center p-4">
                  <Spinner />
                </td>
              </tr>
            ) : (
              events &&
              events.map((event, index) => (
                <tr key={index} className="border-b border-gray-600 py-1">
                  <td className="py-2 pl-3">{event.name}</td>
                  <td className="p-2">{event.location}</td>
                  <td className="p-2">{event.description.slice(0, 20)}</td>
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
              ))
            )}
          </tbody>
        </table>
      </div>
      {showCreateModal && <CreateModal onClose={handleEventCreated} />}
      {showViewModal && selectedEvent && (
        <ViewModal
          event={selectedEvent}
          onClose={() => setShowViewModal(false)}
        />
      )}
      {showEditModal && selectedEvent && (
        <EditModal event={selectedEvent} onClose={handleEventUpdated} />
      )}
      {showDeleteModal && selectedEvent && (
        <DeleteModal event={selectedEvent} onClose={handleEventDeleted} />
      )}
    </div>
  );
};

export default EventTable;
