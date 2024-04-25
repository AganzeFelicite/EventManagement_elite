import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch"; // Import the useFetch hook

const EventList = () => {
  // State to store the fetched events
  const [events, setEvents] = useState([]);

  // Fetch events from the database using the useFetch hook
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/event/all"
  );

  // Update the events state when data is fetched
  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  return (
    <div className="py-6 my-6 bg-gray-100 grid items-center justify-center">
      {/* Display a loading message while data is being fetched */}
      {isPending && <div>Loading...</div>}
      {/* Display an error message if data fetching fails */}
      {error && <div>{error}</div>}
      {/* Map through the events and render each event */}
      {events.map((event) => (
        <div
          key={event.id}
          className="p-6 m-2 bg-white flex items-center space-x-4 rounded-lg shadow-md hover:scale-105 transition transform duration-500 cursor-pointer w-[800px]" // Increased the width to 800px
        >
          <div>
            {/* Assuming your event object has an 'image' property */}
            {/* Replace 'event.image' with the actual property from your API */}
            <img
              className="h-8 w-auto"
              src="https://www.etite.tech/wp-content/uploads/2024/03/Logo-4x.png"
              alt=""
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-700 mb-2">
              {event.title}
            </h1>
            <p className="text-gray-600 w-80 text-sm">{event.description}</p>
            <p className="text-gray-600 text-sm">Date: {event.date}</p>
            <p className="text-gray-600 text-sm">Location: {event.location}</p>
            <p className="text-gray-600 text-sm">
              Available Tickets: {event.available_tickets}
            </p>
          </div>
          <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
