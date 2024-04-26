import React, { useContext, useState } from "react";
import { AuthContext } from "../auth/AuthContext";

const CreateEventForm = () => {
  const { login, loginUser, userInfo, token } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [availableTickets, setAvailableTickets] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newEvent = {
      title,
      description,
      date,
      location,
      available_tickets: availableTickets,
      created_by: userInfo.id,
    };
    if (userInfo.is_admin) {
      try {
        // Assuming you have access to the token value

        const response = await fetch("http://localhost:5000/event/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
          body: JSON.stringify(newEvent),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Event created:", data);
          // Reset form fields after successful submission
          setTimeout(() => setIsLoading(false), 9000);

          setTitle("");
          setDescription("");
          setDate("");
          setLocation("");
          setAvailableTickets(0);
        } else {
          console.error("Error creating event:", data);
          // Handle error case, e.g., show an error message
        }
      } catch (err) {
        console.error("Error:", err);
        // Handle error case, e.g., show an error message
      }
    }
  };

  return (
    <div className="flex items-center justify-center  bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl text-center font-bold mb-4 text-blue-600">
          Create Event
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full p-2 border border-blue-300 rounded"
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="block w-full p-2 border border-blue-300 rounded"
              placeholder="Enter event description"
              required
            ></textarea>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Date:
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="block w-full p-2 border border-blue-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="block w-full p-2 border border-blue-300 rounded"
              placeholder="Enter event location"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="availableTickets"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Available Tickets:
            </label>
            <input
              type="number"
              id="availableTickets"
              value={availableTickets}
              onChange={(e) => setAvailableTickets(e.target.value)}
              className="block w-full p-2 border border-blue-300 rounded"
              placeholder="Enter number of tickets"
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-6">
          {isloading ? (
            <button
              type="submit"
              className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              loading ...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Event
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;
