import React from "react";
import QRCode from "react-qr-code";

const TicketComponent = ({ ticket }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const ticketData = {
    id: ticket.id,
    title: ticket.title,
    date: formatDate(ticket.date),
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="px-6 py-2 m-2 bg-white flex items-center space-x-4 rounded-lg shadow-md hover:scale-105 transition transform duration-500 cursor-pointer w-[800px]">
      <div className="flex justify-between items-center mb-4">
        <img
          className="h-8 w-auto"
          src="https://www.etite.tech/wp-content/uploads/2024/03/Logo-4x.png"
          alt=""
        />
      </div>

      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Event Details</h2>
        <p className="text-gray-600">
          <span className="font-semibold">Title:</span> {ticketData.title}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Date:</span> {ticketData.date}
        </p>
      </div>

      <div className="mb-4">
        {/* <h2 className="text-lg font-semibold text-gray-700">
          Ticket Information
        </h2> */}
        <p className="text-gray-600">
          <span className="font-semibold">Ticket ID:</span> {ticketData.id}
        </p>
      </div>
      <p>
        <p>
          <QRCode value={`Ticket ID: ${ticketData.id}`} size={64} />
        </p>
        <QRCode value={`Ticket ID: ${ticketData.id}`} size={64} />
      </p>
      <div className="text-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handlePrint}
        >
          Print Ticket
        </button>
      </div>
    </div>
  );
};

export default TicketComponent;
