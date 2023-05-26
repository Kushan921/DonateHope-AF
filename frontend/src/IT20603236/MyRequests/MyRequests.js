// import { Button, Link } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


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

export default function MyRequests() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setname] = useState("");
  const [age, setage] = useState("");
  const [nic, setnic] = useState("");
  const [contactno, setcontactno] = useState("");
  const [bloodtype, setbloodtype] = useState("");
  const [hospital, sethospital] = useState("");
  const [bloodpint, setbloodpint] = useState("");
  const [UpdateModal, setUpdateModal] = useState(false);
  const [UpdateItem, setUpdateItem] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addNewModal, setIsNewOpen] = useState(false);
  const initialValues = {
    code: "",
    name: "",
    description: "",
    quantity: 0,
  };



  useEffect(() => {
    axios
      .get("http://localhost:8020/normal/0722329450")
      .then((response) => {
        if (response) {
          setItems(response.data);
        } else {
          toast.error("Error While Fetching Data!!");
        }
      })
      .catch((error) => toast.error(error));
  },[items]);

  const deleteItem = (id) => {
    axios
      .delete(`http://localhost:8020/normal/delete/${id} `)
      .then(() => {
        alert("Request Deleted")
      })
      .catch((err) => {
        alert(err);
      });
  };

  

  function getOne(id) {
    const response = axios
      .get(`http://localhost:8020/normal/get/${id}`)
      .then((response) => {
        setIsOpen(true);
        setname(response?.data?.name);
        setage(response?.data?.age);
        setnic(response?.data?.nic);
        setcontactno(response?.data?.contactno);
        setbloodtype(response?.data?.bloodtype);
        sethospital(response?.data?.hospital);
        setbloodpint(response?.data?.bloodpint);
        setUpdateItem(response?.data?._id);
        console.log(response?.data?._name);
      });
  }
  function updateItem(values) {
    const response = axios
      .put(`http://localhost:8020/normal/update/${UpdateItem}`, {
        name: values.name,
        age: values.age,
        nic: values.nic,
        contactno: values.contactno,
        bloodtype: values.bloodtype,
        hospital: values.hospital,
        bloodpint: values.bloodpint
      })
      .then((response) => {
        toast.success("Update Successfully");
        setIsOpen(false);
      });
  }

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
      <div className="w-full bg-gray-100 py-10 text-center">
        <h1 className="text-2xl">My Requests</h1>
      </div>
      
      <div className=" px-10 mt-10 ">
        <div class=" shadow-md sm:rounded-lg ">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-red-900 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Age
                </th>
                <th scope="col" class="px-6 py-3">
                  NIC
                </th>
                <th scope="col" class="px-6 py-3">
                  Contact Number
                </th>
                <th scope="col" class="px-6 py-3">
                  Blood Type
                </th>
                <th scope="col" class="px-6 py-3">
                  Hospital
                </th>
                <th scope="col" class="px-6 py-3">
                  Blood Pints
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr class="bg-white border-b dark:bg-gray-100 dark:border-gray-200 hover:bg-gray-10 dark:hover:bg-gray-200">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-black-950 whitespace-nowrap dark:text-black"
                  >
                    {item.name}
                  </th>
                
                  <td class="px-6 py-4 dark:text-black">{item.age}</td>
                  <td class="px-6 py-4 dark:text-black">{item.nic}</td>
                  <td class="px-6 py-4 dark:text-black">{item.contactno}</td>
                  <td class="px-6 py-4 dark:text-black">{item.bloodtype}</td>
                  <td class="px-6 py-4 dark:text-black">{item.hospital}</td>
                  <td class="px-6 py-4 dark:text-black">{item.bloodpint}</td>
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
                        strokeWnameth={1.2}
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
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this Request ?"
                          )
                        ) {
                          deleteItem(item._id);
                        }
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWnameth={1.5}
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
        </div>
      </div>
      
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={{
              name: name,
              age: age,
              nic: nic,
              contactno: contactno,
              bloodtype: bloodtype,
              hospital: hospital,
              bloodpint: bloodpint
              
            }}
            // valnameationSchema={valnameationSchema}
            onSubmit={updateItem}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="flex gap-4">
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Name</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="name"
                        required={true}
                      />
                    </div>
                  </div>
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Age</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="age"
                        required={true}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">NIC</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="text"
                        name="nic"
                        required={true}
                      />
                    </div>

                    <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="nic"
                   />
                </div>
                

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Contact No</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="contactno"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="contactno"
                  />
                </div>

                <div className="flex-col w-full">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Blood Type</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                      type="text"
                      name="bloodtype"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs"
                    name="bloodtype"
                  />
                </div>

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Hospital</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                      type="text"
                      name="hospital"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="hospital"
                  />
                </div>

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Blood Pint</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                      type="text"
                      name="bloodpint"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="bloodpint"
                  />
                </div>
                

                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </section>
  );
}
