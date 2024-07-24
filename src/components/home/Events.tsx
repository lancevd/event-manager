import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";
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

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [sortOrder, setSortOrder] = useState("name");

  // Fetch data from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/events`
        );
        setEvents(response.data);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    filterAndSortEvents();
  }, [searchQuery, sortOrder, events]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };

  const filterAndSortEvents = () => {
    let filtered = events.filter((event) =>
      event.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortOrder === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "date") {
      filtered.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    setFilteredEvents(filtered);
  };

  return (
    <section className="contain py-6 text-gray-600 body-font">
      <div className="flex flex-col justify-center items-center md:flex-row md:justify-between gap-4 mb-8 md:mb-4">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Upcoming Events
        </h2>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border p-2 rounded-md"
          />
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="border p-2 rounded-md"
          >
            <option value="name">Sort by Name</option>
            <option value="date">Sort by Date</option>
          </select>
        </div>
      </div>
      <div className="px-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {filteredEvents.map((event) => (
            <div key={event._id} className="p-4 md:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Link to={`events/detail/${event._id}`}>
                  <img
                    className="lg:h-56 md:h-44 w-full object-cover object-center"
                    src={event.image}
                    alt="event"
                  />
                </Link>
                <div className="p-6">
                  <p className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <h3 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {event.name}
                  </h3>
                  <p className="leading-relaxed mb-3">{event.description}</p>
                  <div className="flex items-center flex-wrap ">
                    <Link
                      to={`events/detail/${event._id}`}
                      className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </Link>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1">
                      <BsClock /> &nbsp;
                      {event.time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
