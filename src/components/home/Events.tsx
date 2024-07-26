import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";
import { AiOutlineArrowRight } from "react-icons/ai";
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

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [sortOrder, setSortOrder] = useState("name");
  const [loading, setLoading] = useState<boolean | null>(false);

  // Fetch data from API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/events`
        );
        setEvents(response.data);
        setLoading(false);
        // console.log(response);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
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
    <section className=" py-6 dark:bg-gray-700 text-gray-300 ">
      <div className="contain">
        <div className="flex flex-col justify-center items-center md:flex-row md:justify-between gap-4 mb-8 md:mb-4">
          <h2 className="text-4xl font-bold text-white text-center mb-8">
            Upcoming Events
          </h2>
          <div className="flex flex-col md:flex-row gap-4 items-center text-gray-200">
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="border p-2 rounded-md dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="border p-2 rounded-md dark:bg-gray-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            >
              <option value="date">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="px-5 mx-auto">
            <div className="flex flex-wrap -m-4">
              {filteredEvents.map((event) => (
                <div key={event._id} className="p-4 w-full sm:w-1/2 lg:w-1/3">
                  <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                    <Link to={`events/details?id=${event._id}`}>
                      <img
                        className="lg:h-56 md:h-44 w-full object-cover object-center"
                        src={event.image}
                        alt="event"
                      />
                    </Link>
                    <div className="p-6">
                      <p className="tracking-widest text-xs title-font font-medium text-gray-150 mb-1">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                      <h3 className="title-font text-lg font-medium text-white mb-3">
                        {event.name}
                      </h3>
                      <p className="leading-relaxed mb-3">
                        {event.description.slice(0, 100)}
                      </p>
                      <div className="flex gap-4 items-center ">
                        <Link
                          to={`events/details?id=${event._id}`}
                          className=" flex gap-3 items-center bg-[#2563EB] hover:bg-[#1D4ED8] text-white focus:ring-4 font-medium rounded-lg text-xs sm:text-sm px-3 py-2 focus:outline-none"
                        >
                          View Details
                          <AiOutlineArrowRight />
                        </Link>
                        <span className="text-white font-medium mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm py-1">
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
        )}
      </div>
    </section>
  );
};

export default Events;
