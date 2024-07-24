import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsClock } from "react-icons/bs";

interface Event {
  id: number;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
}

const events: Event[] = [
  {
    id: 1,
    name: "Summer Fest",
    description: "Lorem ipsum dolor sit amet consecteru elit adipiscing.",
    date: "2024-08-15",
    time: "10:00 AM",
    location: "Stadium, Ibadan",
    image:
      "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Block Party Summer",
    description:
      "Lorem ipsum dolor sit amet consecteru elit adipiscing. Lorem ipsum dolor sit amet consecteru elit adipiscing.",
    date: "2024-09-15",
    time: "10:00 AM",
    location: "Stadium, Ibadan",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Mid-Year Tech Conference",
    description: "Lorem ipsum dolor sit amet consecteru elit adipiscing.",
    date: "2024-08-23",
    time: "10:00 AM",
    location: "Stadium, Ibadan",
    image:
      "https://images.unsplash.com/photo-1559223607-a43c990c692c?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Naija Chefs Meetup",
    description: "Lorem ipsum dolor sit amet consecteru elit adipiscing.",
    date: "2024-10-05",
    time: "10:00 AM",
    location: "Stadium, Ibadan",
    image:
      "https://images.unsplash.com/photo-1705917893274-ac6d684b0a01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNoZWZzfGVufDB8fDB8fHww",
  },
  {
    id: 5,
    name: "End of the Year Party",
    description: "Lorem ipsum dolor sit amet consecteru elit adipiscing.",
    date: "2024-08-15",
    time: "10:00 AM",
    location: "Stadium, Ibadan",
    image:
      "https://images.unsplash.com/photo-1438557068880-c5f474830377?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Events: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [sortOrder, setSortOrder] = useState("name");

  useEffect(() => {
    filterAndSortEvents();
  }, [searchQuery, sortOrder]);

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
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
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
            <div key={event.id} className="p-4 md:w-1/2 lg:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <Link to={"events/detail"}>
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
                      to={"events/detail"}
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
