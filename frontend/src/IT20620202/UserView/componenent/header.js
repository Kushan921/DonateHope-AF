import { React } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
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
              onClick={() => {}}
            >
              <div className="flex items-center">
                {/* <span className="hidden sm:block">{`${userData.firstName} `}</span> */}
                <img className={`mx-2`} src="/images/userAvatar2.png" alt="d" />
              </div>
            </button>
            <div className="flex items-center justify-center md:hidden">
              <button
                className="text-left mx-2 text-sm"
                type="button"
                onClick={() => {}}
              >
                Profile
              </button>

              <span>|</span>

              <button className="mx-2 text-sm" type="button">
                Log Out
              </button>
            </div>
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

                    <Link
                    to="/login"
                    >
                    <button
                    className=" bg-yellow-800 hover:bg-yellow-700 p-3 text-white rounded-md"
                    href="/login"
                  >
                    Login
                  </button>
                    </Link>
                  
                    <Link
                    to="/signin"
                    >
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
