import React, { useState, useEffect } from "react";

const TestingPage = () => {
  const [countdowns, setCountdowns] = useState([]);

  // Assume you receive an array of objects from an API
  const apiResponse = [
    { id: 1, milliseconds: 10000 },
    { id: 2, milliseconds: 20000 },
    { id: 3, milliseconds: 30000 },
    // ... more objects
  ];

  useEffect(() => {
    // Create countdowns based on the API response
    const newCountdowns = apiResponse.map((item) => {
      return {
        id: item.id,
        timeRemaining: item.milliseconds,
      };
    });

    setCountdowns(newCountdowns);
  }, []);

  useEffect(() => {
    const intervalIds = [];

    countdowns.forEach((countdown) => {
      const { id, timeRemaining } = countdown;

      const intervalId = setInterval(() => {
        setCountdowns((prevCountdowns) => {
          return prevCountdowns.map((item) => {
            if (item.id === id) {
              const updatedTime = item.timeRemaining - 1000;

              if (updatedTime <= 0) {
                clearInterval(intervalId);
                return { ...item, timeRemaining: 0 };
              }

              return { ...item, timeRemaining: updatedTime };
            }

            return item;
          });
        });
      }, 1000);

      intervalIds.push(intervalId);
    });

    return () => {
      intervalIds.forEach((intervalId) => {
        clearInterval(intervalId);
      });
    };
  }, [countdowns]);

  return (
    <div>
      {apiResponse.map((item) => {
        const { id } = item;
        const countdown = countdowns.find((countdown) => countdown.id === id);
        if (!countdown) {
          return null; // Ignore if countdown is not found
        }
        const { timeRemaining } = countdown;
        const hours = Math.floor(timeRemaining / (1000 * 60 * 60));
        const minutes = Math.floor(
          (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        return (
          <div key={id}>
            <span>{hours}h </span>
            <span>{minutes}m </span>
            <span>{seconds}s</span>
          </div>
        );
      })}
    </div>
  );
};

export default TestingPage;
