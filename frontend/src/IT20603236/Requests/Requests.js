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

export default function AllRequests() {
  const navigate = useNavigate();
  const [bloodtype,setbloodtype] = useState("")
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [addNewModal, setIsNewOpen] = useState(false);
  const [addNewModalEmergency, setIsNewOpenEmergency] = useState(false);
  const initialValues = {
    code: "",
    name: "",
    description: "",
    quantity: 0,
  };


  function AddNormal(values) {
    console.log(values);

    const response = axios
      .post(`http://localhost:8020/normal/add`, {
        name: values.name,
        age: values.age,
        nic: values.nic,
        contactno: values.contactno,
        bloodtype: bloodtype,
        hospital: values.hospital,
        bloodpint: values.bloodpint
      })
      .then(() => {
        toast.success("Added Successfully!!");
        setIsNewOpen(false);

      
      })
      .catch(() => {
        toast.error("error!!");
      });
  }

  function AddEmergency(values) {
    console.log(values);

    const response = axios
      .post(`http://localhost:8020/emergency/add`, {
        name: values.name,
        age: values.age,
        nic: values.nic,
        contactno: values.contactno,
        bloodtype: bloodtype,
        hospital: values.hospital,
        bloodpint: values.bloodpint,
        date: values.date,
        time: values.time
      })
      .then(() => {
        toast.success("Added Successfully!!");
        setIsNewOpenEmergency(false);
      })
      .catch(() => {
        toast.error("error!!");
      });
  }


 

  return (
    <section className="table-auto overflow-y-scroll h-screen pb-10">
     
      <div className="w-full flex flex-row px-80 mt-60">
        <button
          type="button"
          onClick={() => {
            setIsNewOpen(true);
          }}
          class=" text-black bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-yellow-600 font-large rounded-lg text-xl px-20 py-20 text-center inline-flex items-center dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:focus:ring-yellow-800 "
        >
          {" "}
          Add Normal Request
          
        </button>
        <div className="mx-4"></div>
        <button
          type="button"
          onClick={() => {
            setIsNewOpenEmergency(true);
          }}
          class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-700 font-medium rounded-lg text-lg px-20 py-20 text-center inline-flex items-center dark:bg-red-800 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          {" "}
          Add Emergency Request
          
        </button>
      </div>

      <Modal
        isOpen={addNewModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={AddNormal}
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
                    <p className="font-semibold">contactno</p>
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

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Blood Type</p>
              
                 </div>
                  <div className="ll">
                    {" "}

                 <select  className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full" required={true} value={bloodtype} onChange={(event) => {
                          setbloodtype(event.target.value);
                        }}>
                    <option value= "choose">-select-</option>
                    <option value= "AB+">AB+</option>
                    <option value= "AB-">AB-</option>
                    <option value= "A+">A+</option>
                    <option value= "A-">A-</option>
                    <option value= "B+">B+</option>
                    <option value= "B-">B-</option>
                    <option value= "O+">O+</option>
                    <option value= "O-">O-</option>
                 </select>
                  
                
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
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
                    <p className="font-semibold" placeholder="Enter a number">Blood Pint</p>
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
                      setIsNewOpen(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Add
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>

{/* add emergency request */}
      <Modal
        isOpen={addNewModalEmergency}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          {" "}
          <Formik
            initialValues={initialValues}
            // validationSchema={validationSchema}
            onSubmit={AddEmergency}
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
                    <p className="font-semibold">contactno</p>
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

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Blood Type</p>
              
                 </div>
                  <div className="ll">
                    {" "}

                    <select  className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full " required={true} value={bloodtype} onChange={(event) => {
                          setbloodtype(event.target.value);
                        }} >
                   
                  <option value= "choose">-select-</option>
                  <option value= "AB+">AB+</option>
                  <option value= "AB-">AB-</option>
                  <option value= "A+">A+</option>
                  <option value= "A-">A-</option>
                  <option value= "B+">B+</option>
                  <option value= "B-">B-</option>
                  <option value= "O+">O+</option>
                  <option value= "O-">O-</option>
                 </select>
                  
                
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
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

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Date</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                      type="date"
                      name="date"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="date"
                  />
                </div>

                <div className="flex-col">
                  <div className="ll">
                    {" "}
                    <p className="font-semibold">Time</p>
                  </div>
                  <div className="ll">
                    {" "}
                    <Field
                      className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                      type="time"
                      name="time"
                    />
                  </div>

                  <ErrorMessage
                    component="div"
                    className="text-red-500 text-xs italic"
                    name="time"
                  />
                </div>

                
                

                <div className="w-full flex gap-2">
                  <button
                    className="bg-red-800 w-1/2 text-white py-3 hover:bg-red-500"
                    onClick={() => {
                      setIsNewOpenEmergency(false);
                    }}
                  >
                    close
                  </button>
                  <button
                    className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                    type="submit"
                  >
                    Add
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
