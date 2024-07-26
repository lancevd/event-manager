import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineCalendarToday } from "react-icons/md";
import { HiOutlineClock } from "react-icons/hi2";
import { IoLocationOutline } from "react-icons/io5";
import axios from "axios";
import Countdown from "../components/home/Countdown";
import Spinner from "../components/Spinner";

interface EventDetails {
  _id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  createdBy: {
    _id: string;
    username: string;
  };
}

const SingleEvent: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = params.get("id");
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [failed, setFailed] = useState<boolean | null>(null);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}api/events/details/${id}`
        );
        // console.log(response);
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
        setErrorMessage("Error fetching event details");
        setFailed(true);
      }
    };

    if (id) {
      fetchEventDetails();
    }
  }, [id]);

  if (!event) {
    return (
      <div className="py-4 dark:bg-gray-700 text-gray-300 text-6xl">
        <Spinner />
      </div>
    );
  }

  const inputDate = new Date(event?.date);
  const formattedDate = inputDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="py-6 px-4 dark:bg-gray-700 text-gray-300">
      <section className="contain">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-white">Event Details</h1>
        </div>
        {failed ? (
          <div className="text-3xl font-bold mb-4 text-white">
            {errorMessage}
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row justify-between items-start gap-5">
            <div className="w-full lg:w-3/5">
              <img
                className="lg:h-[30rem] md:h-80 rounded h-64 w-full object-cover object-center"
                src={event.image}
                alt="event"
              />
              <br />
              <p className="text-lg">{event.description}</p>
            </div>
            <div className="w-full lg:w-2/5">
              <h2 className="text-2xl font-bold mb-4">{event.name}</h2>
              <a className="inline-flex items-center mb-6">
                <img
                  alt="user"
                  src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671142.jpg?w=740&t=st=1721998818~exp=1721999418~hmac=05bd7ba64e59402ca4d58a253e6c1f92faae0b47d56d7f6986122692ef675b28"
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-200 capitalize">
                    {event.createdBy.username}
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    ORGANIZER
                  </span>
                </span>
              </a>
              <p className="flex items-center gap-3 text-sm mb-3">
                <span className="font-bold mr-2">
                  <MdOutlineCalendarToday />
                </span>
                {formattedDate}
              </p>
              <p className="flex items-center gap-3 text-sm mb-3">
                <span className="font-bold mr-2">
                  <HiOutlineClock />
                </span>
                {event.time}
              </p>
              <p className="flex items-center gap-3 text-sm mb-3">
                <span className="font-bold mr-2">
                  <IoLocationOutline />
                </span>
                {event.location}
              </p>
              <p className="my-4">Countdown to event</p>
              <Countdown eventDate={event.date} /> <br />
              <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Register Now
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default SingleEvent;
