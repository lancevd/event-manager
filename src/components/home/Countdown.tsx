import React, { useEffect, useState } from "react";

// Interface for the TimeLeft object to define the structure
interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

// Interface for the props expected by the Countdown component
interface CountdownProps {
  eventDate: string;
}

// Countdown component definition
const Countdown: React.FC<CountdownProps> = ({ eventDate }) => {
  // Function to calculate the time left until the event date
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(eventDate) - +new Date();
    let timeLeft: TimeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  // State to store the calculated time left
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    // Set a timer to update the time left every second
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  // Array to store the JSX elements for displaying the countdown
  const timerComponents: JSX.Element[] = [];

  // Iterate over the keys of the timeLeft object and create span elements for each interval
  Object.keys(timeLeft).forEach((interval) => {
    const key = interval as keyof TimeLeft;
    if (!timeLeft[key]) {
      return;
    }

    timerComponents.push(
      <span key={interval} className="mx-1">
        {timeLeft[key]} {interval}
      </span>
    );
  });

  return (
    <div className="w-full border bg-gray-500 rounded-lg text-center">
      <p className="countdown p-4 text-white text-3xl">
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </p>
    </div>
  );
};

export default Countdown;
