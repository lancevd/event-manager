import React, { useEffect, useState } from "react";

interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

interface CountdownProps {
  eventDate: string;
}

const Countdown: React.FC<CountdownProps> = ({ eventDate }) => {
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

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

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
