import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import TicketComponent from "./tiket";
import { AuthContext } from "../auth/AuthContext";

const MyTickets = () => {
  const { token, userInfo } = useContext(AuthContext);
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/booking/all",
    token
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = data.filter((ticket) =>
      ticket.title.toLowerCase().includes(term)
    );
    setFilteredData(filtered);
  };

  return (
    <div>
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className=" p-2 m-2 flex justify-center items-center">
        <input
          type="text"
          placeholder="Search by event title"
          value={searchTerm}
          onChange={handleSearch}
          className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {(searchTerm ? filteredData : data)?.map((ticket) => (
        <div
          key={ticket.id}
          className="py-3 my-6  bg-gray-100 grid items-center justify-center"
        >
          <h2 className="flex justify-center items-center bg-blue-200 text-gray-800 font-bold text-xl">
            For The Event {ticket.title} you have booked {ticket.tickets_booked}{" "}
          </h2>
          {Array.from({ length: ticket.tickets_booked }, (_, index) => (
            <TicketComponent key={index} ticket={ticket} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MyTickets;
