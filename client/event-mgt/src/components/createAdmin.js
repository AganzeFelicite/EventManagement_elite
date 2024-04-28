import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const signupLink = "http://localhost:5000/user/register";
  const [isloading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: true,
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(signupLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User created:", data);
        setIsLoading(false);
        navigate("/login");
      } else {
        console.error("Error creating user:", data);
        setIsLoading(false);
        // Handle error case, e.g., show an error message
      }
    } catch (err) {
      console.error("Error:", err);
      setIsLoading(false);
      // Handle error case, e.g., show an error message
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl text-center font-bold mb-4">
          Create new Admin
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={userData.username}
              onChange={handleChange}
              className="block w-full p-2 border border-blue-300 rounded"
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className="block w-full p-2 border border-blue-300 rounded"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Other form fields */}
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="block w-full p-2 border border-blue-300 rounded"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex items-center justify-center">
          {!isloading ? (
            <button
              type="submit"
              className="bg-blue-300 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              create admin
            </button>
          ) : (
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              loading ...
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
