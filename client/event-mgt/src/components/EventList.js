import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "react-modal";
import { AuthContext } from "../auth/AuthContext";
import CreateEventForm from "./createEvent";

Modal.setAppElement("#root");
const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketsNumber, setTicketsNumber] = useState(0);
  const [eventId, setEventId] = useState(null);
  const [loadinBooking, setLoadingBooking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Fetch events from the database using the useFetch hook
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/event/all"
  );
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { token, userInfo } = useContext(AuthContext);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoadingBooking(true);
    const ticket = {
      event_id: eventId,
      user_id: userInfo.id,
      ticketsBooked: parseInt(ticketsNumber),
    };
    console.log(ticket);

    try {
      const response = await fetch(
        `http://localhost:5000/booking/${eventId}/book`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(ticket),
        }
      );

      if (response.ok) {
        closeModal();
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 9000);
        setLoadingBooking(false);
        closeModal();
      } else {
        const data = await response.json();
      }
    } catch (error) {
      console.log("Error during booking:", error);
    }
  };
  const preventModalClose = (e) => {
    e.stopPropagation();
  };

  const bookModal = (eventId) => {
    setEventId(eventId);
    setIsModalOpen(true);
    openModal();
  };
  // Update the events state when data is fetched
  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  return (
    <div className="py-6 my-6 bg-gray-100 grid items-center justify-center">
      {userInfo.is_admin && <CreateEventForm />}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-blue-300 text-white p-4 rounded-md">
            Ticket(s) booked successfully
          </div>
        </div>
      )}
      {isPending && <div>Loading...</div>}
      {/* Display an error message if data fetching fails */}
      {error && <div>{error}</div>}
      {/* Map through the events and render each event */}
      {events.map((event) => (
        <div
          key={event.id}
          className="px-6 py-2 m-2 bg-white flex items-center space-x-4 rounded-lg shadow-md hover:scale-105 transition transform duration-500 cursor-pointer w-[800px]" // Increased the width to 800px
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
            <button
              onClick={() => bookModal(event.id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Book Now
            </button>
            {userInfo.is_admin && (
              <button
                onClick={() => bookModal(event.id)}
                className="mx-6 bg-blue-300 text-white px-4 py-2 rounded-md"
              >
                Manage Event
              </button>
            )}
          </div>
        </div>
      ))}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onClick={preventModalClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Book Tickets/ticket</h2>
          <label>Number of tickets</label>
          <input
            type="number"
            name="tickets"
            onChange={(e) => setTicketsNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4"
            placeholder="Enter new password"
          />
          <div className="flex justify-end">
            <button
              onClick={handleBooking}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              Book now
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EventList;
