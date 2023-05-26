import React from "react";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
export const Events = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  return (
    <section>
      <div className="w-full bg-slate-100 text-2xl mt-10 text-center py-5">
        Upcoming Events
      </div>
      <div className="flex justify-center">
        <div className="w-1/2">
          <form>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative border-2 mt-2">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  class="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 pl-10 text-sm"
                placeholder="Search By Date"
                required
              />
              <button
                type="submit"
                class="text-white absolute right-2.5 bottom-2.5 bg-red-700 text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex overflow-x-auto p-1 gap-2 mb-10 justify-center mt-5">
        <div className="bg-yellow-200 w-auto h-10 p-2">Colombo</div>
        <div className="bg-yellow-200 w-auto h-10 p-2">Kandy</div>
        <div className="bg-yellow-200 w-auto h-10 p-2">Gampaha</div>
        <div className="bg-yellow-200 w-auto h-10 p-2">Galle</div>
        <div className="bg-yellow-200 w-auto h-10 p-2">Kurunegala</div>
        <div className="bg-yellow-200 w-auto h-10 p-2">Badulla</div>
        <div className="bg-yellow-200 w-auto h-10 p-2">Jaffna</div>
      </div>
      <div className="ml-10">
        <div className=" w-1/5">
          <div className=" bg-red-300 shadow-md rounded-lg">
            <img
              className="object-cover h-full w-full rounded-t-lg"
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/fd/0b/7b/caption.jpg?w=500&h=400&s=1"
              alt="Card images cap"
            />
            <div className="mt-2">
              <p className="text-3xl font-semibold text-red-900  text-left ml-3">
                10 TH
              </p>
              <p className="text-sm font-semibold text-red-900  text-left ml-3">
                May 2023
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-semibold text-red-950  text-left ml-3 mt-3 pb-3">
                CR&FC Ground
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 text-red-900"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <div className="w-full text-center bg-red-800 text-white py-3 my-3">
            <p className="text-lg">Engage For This Event</p>
          </div>
        </div>
        <div class="flex items-start mb-6">
          <div class="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              class="w-4 h-4 border border-gray-300 rounded bg-gray-50"
              required
            />
          </div>
          <label for="terms" class="ml-2 text-sm font-medium text-gray-900">
            I agree with the{" "}
            <a
              href="#"
              class="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <div className="w-full flex gap-2">
          <button
            className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Close
          </button>
          <button
            className="bg-yellow-600 w-1/2 text-white py-3 hover:bg-yellow-500 flex gap-5 justify-center"
            type="submit"
          >
            Enroll Me
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </button>
        </div>
      </Modal>
    </section>
  );
};
