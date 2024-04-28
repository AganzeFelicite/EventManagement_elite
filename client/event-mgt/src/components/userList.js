import React, { useState, useEffect, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { AuthContext } from "../auth/AuthContext";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(AuthContext);

  // Fetch users from the database using the useFetch hook
  const { data, isPending, error } = useFetch(
    "http://localhost:5000/user/admin/users",
    token
  );

  // Update the users state when data is fetched
  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  return (
    <div className="py-6 my-6 bg-gray-100 grid items-center justify-center">
      <h1>List Of users</h1>
      {isPending && <div>Loading...</div>}
      {/* Display an error message if data fetching fails */}
      {error && <div>{error}</div>}
      {/* Map through the users and render each user */}
      {users.map((user) => (
        <div
          key={user.id}
          className="px-6 py-2 m-2 bg-white flex items-center space-x-4 rounded-lg shadow-md hover:scale-105 transition transform duration-500 cursor-pointer w-[800px]"
        >
          <div>
            <svg
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-700 mb-2">
              {user.username}
            </h1>
            <p className="text-gray-600 w-80 text-sm">{user.email}</p>
            <p className="text-gray-600 text-sm">
              Role: {user.is_admin ? "Admin" : "User"}
            </p>
          </div>
          <div className="flex space-x-2 ml-auto">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
            <button className="bg-[#fecaca] hover:bg-[#f87171] text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
