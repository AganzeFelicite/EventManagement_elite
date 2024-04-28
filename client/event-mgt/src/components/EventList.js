import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import Modal from "react-modal";
import { AuthContext } from "../auth/AuthContext";
import CreateEventForm from "./createEvent";

Modal.setAppElement("#root");
const EventList = () => {
  const { token, userInfo } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ticketsNumber, setTicketsNumber] = useState(0);
  const [eventId, setEventId] = useState(null);
  const [loadinBooking, setLoadingBooking] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isEventMgtModel, setEventMgtModel] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [availableTickets, setAvailableTickets] = useState(0);
  const [isloading, setIsLoading] = useState(false);
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formattedDate = date
      ? new Date(date).toISOString().slice(0, 10)
      : null;

    const newEvent = {
      title,
      description,
      date: formattedDate,
      location,
      available_tickets: availableTickets,
      created_by: userInfo?.id,
    };
    if (userInfo?.is_admin) {
      try {
        // Assuming you have access to the token value

        const response = await fetch(
          `http://localhost:5000/event/update/${eventId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the request headers
            },
            body: JSON.stringify(newEvent),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log("Event created:", data);
          // Reset form fields after successful submission
          setTimeout(() => setIsLoading(false), 9000);
          setIsUpdateNow(false);
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
  // Fetch events from the database using the useFetch hook
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/event/all"
  );
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const opentEventMgtModel = () => setEventMgtModel(true);
  const closeEventMgtModel = () => setEventMgtModel(false);
  const [isUpdateNow, setIsUpdateNow] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({});

  const closeMgtModel = () => {
    setEventMgtModel(false);
    setIsUpdateNow(false);
    setIsLoading(false);
  };
  const handleBooking = async (e) => {
    e.preventDefault();
    setLoadingBooking(true);
    const ticket = {
      event_id: eventId,
      user_id: userInfo?.id,
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

  const getEventById = (event_id) => {
    return events.find((event) => event.id === event_id);
  };
  //  const  manageEvent = (eventid) {
  //   setEventId(eventId);

  //  };
  const bookModal = (eventId) => {
    setEventId(eventId);

    openModal();
  };

  const openMgtModel = (event_id) => {
    setEventId(event_id);
    setCurrentEvent(getEventById(event_id));
    setEventMgtModel(true);

    opentEventMgtModel();
  };
  const updateNow = () => {
    setIsUpdateNow(true);
  };
  // Update the events state when data is fetched
  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:5000/event/delete/${eventId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.ok) {
      setEventMgtModel(false);
      closeEventMgtModel();
    }
  };

  return (
    <div className="py-6 my-6 bg-gray-100 grid items-center justify-center">
      {userInfo?.is_admin && <CreateEventForm />}
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
            <p className="text-gray-600 text-sm">
              Date: {new Date(event?.date).toISOString().slice(0, 10)}
            </p>
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
            {userInfo?.is_admin && (
              <button
                onClick={() => openMgtModel(event.id)}
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
            placeholder="Number of tickets to book"
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
      <Modal
        isOpen={isEventMgtModel}
        onRequestClose={closeEventMgtModel}
        onClick={preventModalClose}
        className="fixed inset-0 z-50 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-lg p-6"
        >
          <h2 className="text-lg font-semibold mb-4">Manage this Event</h2>
          {isUpdateNow && (
            <form
              onSubmit={handleUpdate}
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            >
              <h2 className="text-2xl text-center font-bold mb-4 text-blue-600">
                Update Event
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
                    value={title || currentEvent.title}
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
                    value={description || currentEvent.description}
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
                    value={date || currentEvent.date}
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
                    value={location || currentEvent.location}
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
                    value={availableTickets || currentEvent.available_tickets}
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
                    onClick={handleUpdate}
                    className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    update
                  </button>
                )}
              </div>
            </form>
          )}

          <div className="flex justify-end">
            <button
              onClick={updateNow}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              update now
            </button>
            <button
              onClick={handleDelete}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
            >
              delete
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={closeMgtModel}
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
