import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "20%",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
const AllApplications = () => {
  const [applications, setApplications] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oneApplication, setOneApplication] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:8020/applicant/apply")
      .then((res) => {
        console.log(res.data);
        setApplications(res.data);
      })
      .catch((err) => {});
  }, []);

  const getOne = (id) => {
    setIsModalOpen(true);
    axios
      .get(`http://localhost:8020/applicant/apply/${id}`)
      .then((res) => {
        console.log(res.data);
        setOneApplication([res.data]);
      })
      .catch((err) => {});
  };

  return (
    <div className="p-10">
      {" "}
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Applicant ID
            </th>
            <th scope="col" class="px-6 py-3">
              Applicant Name
            </th>

            <th scope="col" class="px-6 py-3 text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {applications &&
            applications.map((item) => (
              <tr class="bg-white border-b dark:bg-gray-100 dark:border-gray-200 hover:bg-gray-10 dark:hover:bg-gray-200">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-black-950 whitespace-nowrap dark:text-black"
                >
                  {item._id}
                </th>
                <td class="px-6 py-4 dark:text-black">{item.name}</td>

                <td class="px-1 py-4 dark:text-black w-full justify-center flex gap-4">
                  <button
                    className="font-medium text-yellow-500 hover:text-yellow-300"
                    onClick={() => {
                      getOne(item._id);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </button>

                  <a
                    href="#"
                    class="font-medium"
                    //   onClick={() => {
                    //     if (
                    //       window.confirm(
                    //         "Are you sure you want to delete this Doctor ?"
                    //       )
                    //     // ) {
                    //     //   deleteItem(item._id);
                    //     // }
                    //   }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 text-red-700 hover:text-red-100"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-black uppercase bg-gray-50 dark:bg-red-300">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Bp
                </th>
                <th scope="col" class="px-6 py-3">
                  Hb
                </th>
                <th scope="col" class="px-6 py-3">
                  Pulse
                </th>
                <th scope="col" class="px-6 py-3">
                  Temperature
                </th>
                <th scope="col" class="px-6 py-3">
                  Has Donated
                </th>
                <th scope="col" class="px-6 py-3">
                  Donated Date
                </th>
                <th scope="col" class="px-6 py-3">
                  Has tattoo
                </th>
                <th scope="col" class="px-6 py-3">
                  Has Earpiece
                </th>

                <th scope="col" class="px-6 py-3 text-center">
                  Weight
                </th>
              </tr>
            </thead>
            <tbody>
              {oneApplication &&
                oneApplication.map((item) => (
                  <tr class="bg-white border-b dark:bg-gray-100 dark:border-gray-200 hover:bg-gray-10 dark:hover:bg-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-black-950 whitespace-nowrap dark:text-black"
                    >
                      {item.Bp}
                    </th>
                    <td class="px-6 py-4 dark:text-black">{item.Hb}</td>
                    <td class="px-6 py-4 dark:text-black">{item.Pulse}</td>
                    <td class="px-6 py-4 dark:text-black">
                      {item.Temperature}
                    </td>
                    <td class="px-6 py-4 dark:text-black">
                      {item.hasDonated == true ? (
                        <div className="bg-green-500 text-center">
                          <p>yes</p>
                        </div>
                      ) : (
                        <div className="bg-red-500 text-center">
                          <p>No</p>
                        </div>
                      )}
                    </td>
                    <td class="px-6 py-4 dark:text-black">
                      {new Date(item.donatedDate).toLocaleDateString()}
                    </td>
                    <td class="px-6 py-4 dark:text-black">
                      {item.hasTattoo == true ? (
                        <div className="bg-red-500 text-center">
                          <p>yes</p>
                        </div>
                      ) : (
                        <div className="bg-green-500 text-center">
                          <p>No</p>
                        </div>
                      )}
                    </td>
                    <td class="px-6 py-4 dark:text-black">
                      {item.hasEarPiercing == true ? (
                        <div className="bg-red-500 text-center">
                          <p>yes</p>
                        </div>
                      ) : (
                        <div className="bg-green-500 text-center">
                          <p>No</p>
                        </div>
                      )}
                    </td>

                    <td class="px-1 py-4 dark:text-black w-full justify-center flex gap-4"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  );
};

export default AllApplications;
