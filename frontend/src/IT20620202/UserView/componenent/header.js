import { React } from "react";
import { useState, useEffect, } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };
  return (
    <div
      className="flex py-1 md:static overflow-hidden main-nav-content md:flex-row flex-col  bg-red-950 md:w-auto md:h-auto w-screen h-screen 
  duration-500 md:opacity-100 transition-all items-center z-40 fixed top-0 left-0 "
    >
      <div className="ml-5">
        <Link to="/" passHref>
          <a>
            <div className="w-1/5">
              <img src="../images/Hope.png" alt="logo" />
            </div>
          </a>
        </Link>
      </div>
      <div className="w-full md:w-2/4 flex gap-8 md:items-center md:justify-center md:flex-row flex-col md:flex-auto flex-1 lg:mt-0 mt-10 px-5 lg:px-0">
        <div>
          <Link to="/doctors" passHref>
            <a className="text-white text-lg hover:text-yellow-600 transition-all duration-500 ease-in-out relative group inline-block">
              Home
            </a>
          </Link>
        </div>
        <div>
          <Link to="/doctors" passHref>
            <a className="text-white text-lg hover:text-yellow-600 transition-all duration-500 ease-in-out relative group inline-block">
              About Us
            </a>
          </Link>
        </div>
        <div>
          <Link to="/doctors" passHref>
            <a className="text-white text-lg hover:text-yellow-600  transition-all duration-500 ease-in-out relative group inline-block">
              Contact Us
            </a>
          </Link>
        </div>
      </div>
      <div className=" flex 2xl:flex flex-none md:ml-auto md:justify-end lg:justify-between items-center lg:border-t-0 lg:pt-0 border-t pt-5 border-gray-300">
        {isLoggedIn ? (
          <div className=" text-xs font-bold">
            <button
              className="inline-flex md:inline-flex"
              type="button"
              onClick={() => {
                setProfileOpen(!profileOpen);
              }}
            >
              <div className="flex items-center mr-10">
                {/* <span className="hidden sm:block">{`${userData.firstName} `}</span> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-8 h-8 text-white hover:text-yellow-600"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
            </button>
            {profileOpen ? (
              <div className="transform transition-all duration-200 profile-dropdown absolute right-2 md:right-4 rounded-md top-19 md:top-16 h-16 w-32 bg-yellow-700 shadow mt-5">
                <button
                  className="text-left px-6 text-sm h-1/2 w-full hover:bg-red-800 rounded-md text-white"
                  type="button"
                  onClick={() => {
                    navigate('/myProfile');
                  }}
                >
                  Profile
                </button>

                <button
                  className="text-left px-6 text-sm h-1/2 w-full hover:bg-red-800 rounded-md text-white"
                  type="button"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Log Out
                </button>
              </div>
            ) : null}
          </div>
        ) : (
          <>
            {loading ? (
              <div className="mr-6">
                <image
                  src="/images/spinner.gif"
                  width="30px"
                  height="30px"
                  alt="spinner"
                />
              </div>
            ) : (
              <>
                <div className="flex gap-9 mr-10">
                  <Link to="/login">
                    <button
                      className=" bg-yellow-800 hover:bg-yellow-700 p-3 text-white rounded-md"
                      href="/login"
                    >
                      Login
                    </button>
                  </Link>

                  <Link to="/signin">
                    <button
                      className=" bg-yellow-800 hover:bg-yellow-700 p-3 text-white rounded-md"
                      href="/login"
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
