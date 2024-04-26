import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const Header = ({ isLoggedIn, onLogout }) => {
  const { userInfo } = useContext(AuthContext);
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProductDropdown = () => {
    setIsProductDropdownOpen(!isProductDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const isAdmin = userInfo?.is_admin;

  return (
    <header className="bg-blue-300">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">ELITE</span>
            <img
              className="h-8 w-auto"
              src="https://www.etite.tech/wp-content/uploads/2024/03/Logo-4x.png"
              alt=""
            />
          </a>
        </div>
        {isLoggedIn ? (
          <div className="hidden lg:flex lg:gap-x-12">
            {/* Other navigation links */}

            <Link to={"/events"}>
              <p
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Events
              </p>
            </Link>

            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              My Bookings
            </a>

            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              About Us
            </a>
            {isAdmin && (
              <>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Manage Events
                </a>
                <a
                  href="#"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Manage Users
                </a>
                {/* Add more admin-specific links here */}
              </>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex lg:gap-x-12">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              About Us
            </a>
          </div>
        )}
        {isLoggedIn ? (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={onLogout} // Call onLogout function when logout button is clicked
              className="bg-blue-900 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to={"/login"}>
              <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </Link>
          </div>
        )}
      </nav>
      {/* Mobile menu */}
      <div
        className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 z-10"></div>
        <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              {/* Mobile menu content */}
              <a
                href="#"
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Analytics
              </a>
              <a
                href="#"
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Engagement
              </a>
              <a
                href="#"
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Security
              </a>
              <a
                href="#"
                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
              >
                Product
              </a>
              {/* Other mobile menu items */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
