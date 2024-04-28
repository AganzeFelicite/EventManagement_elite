// import React, { useState } from 'react';

// const RevokeTikets = ({ booking, handleRevokeOrReduce }) => {
//   const [ticketsToRevoke, setTicketsToRevoke] = useState(0);

//   const handleChange = (e) => {
//     const value = e.target.value;
//     if (value === '') {
//       setTicketsToRevoke(0);
//     } else {
//       const numValue = parseInt(value, 10);
//       setTicketsToRevoke(numValue > booking.ticketsBooked ? booking.ticketsBooked : numValue);
//     }
//   };

//   const handleUpdate = () => {
//     handleRevokeOrReduce(booking.id, booking.eventId, ticketsToRevoke);
//   };

//   return (
//     <div className="flex items-center">
//       <input
//         type="number"
//         className="w-20 p-2 border border-gray-300 rounded"
//         value={ticketsToRevoke}
//         onChange={handleChange}
//         min={0}
//         max={booking.ticketsBooked}
//       />
//       <button
//         className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={handleUpdate}
//         disabled={ticketsToRevoke === 0}
//       >
//         {ticketsToRevoke === booking.ticketsBooked ? 'Revoke' : 'Reduce'}
//       </button>
//     </div>
//   );
// };
// export default RevokeTikets;