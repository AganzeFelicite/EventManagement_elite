import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import useFetch from "../hooks/useFetch";
import UserInfoFetcher from "./userFetchInfo";

Modal.setAppElement("#root");
const UserLogin = ({ onLogin }) => {
  const { login, loginUser, userInfo } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    console.log("userInfo", userInfo);
  }, [userInfo]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const preventModalClose = (e) => {
    e.stopPropagation();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(JSON.stringify(credentials));
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const tokeData = await response.json();
        login(tokeData.token);
        setToken(tokeData.token);
      } else if (response.status === 404) {
        const data = await response.json();
        setError(data);
        openModal();
      }
    } catch (error) {
      console.log("Error during login:", error);
      setError("An error occurred during login. Please try again.");
      openModal();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password:
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="mb-4">
          <Link to="/signup">
            <h4>
              don't have a account?{" "}
              <Link to="/signup">
                <a className="text-blue-700">click me</a>
              </Link>
            </h4>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign In
          </button>
        </div>
      </form>

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
          <h2 className="text-lg font-semibold mb-4">Error</h2>
          <p>{error}</p>
          <button
            className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
      {token && <UserInfoFetcher token={token} />}
    </div>
  );
};

export default UserLogin;
