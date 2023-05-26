import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import DatePicker from "react-datepicker";

const MyProfile = () => {
  const [userData, setUserData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [gender, setGender] = useState(null);
  const [bloodGroup, setBloodGroup] = React.useState(null);
  const [phone, setPhone] = React.useState();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [hasDonated, setHasDonated] = React.useState(false);
  const [hasTattoo, setHasTattoo] = React.useState(false);
  const [hasEarPiercing, setHasEarPiercing] = React.useState(false);
  const [donatedDate, setDonatedDate] = React.useState(new Date());
  const [dental, setDental] = React.useState(false);
  const [medicalDocument, setMedicalDocument] = React.useState(null);
  const maxDate = new Date();

  const userId = localStorage.getItem("userId");

  let navigate = useNavigate();

  useEffect(() => {
    setFormLoading(true);

    const response = axios
      .get(`http://localhost:8020/donor/users/${userId}`, {})
      .then((res) => {
        setFormLoading(false);
        console.log(res.data);
        setUserData(res.data);
        setGender(res.data.gender);
        setBloodGroup(res.data.bloodGroup);
        setPhone(res.data.contact);
      })
      .catch((err) => {
        setFormLoading(false);
        toast.error("Something went wrong");
        console.log(err);
      });
  }, []);
  const initialValues = {
    firstName: userData?.firstName,
  };
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

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required Name"),
    lastName: Yup.string().required("Required Name"),
    NIC: Yup.string()
      .length(12, "NIC must be exactly 12 digits")
      .required("NIC is required"),
    age: Yup.number().required("Required Age"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });
  const validationSchemaForApply = Yup.object({
    weight: Yup.number().required("Required"),
    pulse: Yup.number().required("Required"),
    hb: Yup.number().required("Required"),
    bp: Yup.number().required("Required"),
    temperature: Yup.number().required("Required"),
    // hasDonated: Yup.boolean().required("Required"),
    // donatedDate: Yup.date().required("Required"),
    // hasTattoo: Yup.boolean().required("Required"),
    // hasEarPiercing: Yup.boolean().required("Required"),
    // medicalDocument: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    setIsLoading(true);

    const responses = axios

      .put(`http://localhost:8020/donor/updateOne/${userId}`, {
        firstName: values.firstName,
        lastName: values.lastName,
        NIC: values.NIC,
        email: values.email,
        gender: gender,
        bloodGroup: bloodGroup,
        isActiveDonor: false,
        contact: phone,
        age: values.age,
        password: values.password,
      })
      .then((response) => {
        toast.success("User Updated Successfully");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error("Something went wrong");
        setIsLoading(false);
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setMedicalDocument(file);
  };

  const applyForActiveDonor = (values) => {
    if (medicalDocument === null) {
      toast.error("Please upload the medical document");
    } else {
      axios
        .post(`http://localhost:8020/applicant/apply/${userId}`, {
          weight: values.weight,
          Pulse: values.pulse,
          Hb: values.hb,
          Bp: values.bp,
          Temperature: values.temperature,
          hasDonated: hasDonated,
          donatedDate: donatedDate,
          hasTattoo: hasTattoo,
          hasEarPiercing: hasEarPiercing,
          medicalDocument: medicalDocument,
        })
        .then((res) => {
          console.log(res.data);
          toast.success("Application submitted successfully");
          setIsOpen(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex w-full justify-center max-h-screen">
      <div className="w-1/2  shadow-lg p-2 mt-10">
        <div className="w-full text-center text-2xl font-bold text-red-800 bg-yellow-100 py-2">
          Hi, {userData?.firstName} !
        </div>
        <div className="flex w-full">
          <div className="flex w-1/2">
            <div class="flex justify-center">
              <div class="w-full px-4 m-2 mt-5">
                <img
                  src="https://www.creative-tim.com/learning-lab/tailwind-starter-kit/img/team-1-800x800.jpg"
                  alt="..."
                  class="shadow-lg rounded-full max-w-full h-auto align-middle border-none"
                />
                <div>
                  <button
                    className=" text-yellow-600 w-full py-2 mt-2 border-2 flex text-center justify-center gap-3
                      "
                    type="submit"
                  >
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
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>

                    {isLoading ? (
                      <ClipLoader color="#fff" loading={isLoading} size={20} />
                    ) : (
                      "Upload New Photo     "
                    )}
                  </button>
                  <button
                    className=" text-red-800 w-full py-2 mt-14 border-2 flex text-center justify-center gap-3 hover:bg-red-950 hover:text-white
                      "
                    onClick={() => {
                      setIsOpen(true);
                    }}
                  >
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
                        d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                      />
                    </svg>

                    {isLoading ? (
                      <ClipLoader color="#fff" loading={isLoading} size={20} />
                    ) : (
                      "Apply For Active Donor "
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <Formik
              initialValues={{}}
              onSubmit={applyForActiveDonor}
              validationSchema={validationSchemaForApply}
            >
              {({ errors, touched }) => (
                <Form enctype="multipart/form-data">
                  <div className="flex gap-3">
                    <div className="flex-col w-1/2">
                      <div className="">
                        {" "}
                        <p className="font-semibold">Weight</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="number"
                          name="weight"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="weight"
                      />
                    </div>
                    <div className="flex-col w-1/2">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Pulse</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="number"
                          name="pulse"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="pulse"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-col w-1/2">
                      <div className="">
                        {" "}
                        <p className="font-semibold">Hb</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="number"
                          name="hb"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="hb"
                      />
                    </div>
                    <div className="flex-col w-1/2">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">BP</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                          type="number"
                          name="bp"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="bp"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-col w-2/3">
                      <div className="ll">
                        {" "}
                        <p className="font-semibold">Temperature</p>
                      </div>
                      <div className="ll">
                        {" "}
                        <Field
                          className="border border-grey-dark text-sm p-3  rounded-md w-full"
                          type="number"
                          name="temperature"
                        />
                      </div>

                      <ErrorMessage
                        component="div"
                        className="text-red-500 text-xs"
                        name="temperature"
                      />
                    </div>
                  </div>
                  <div className="w-full flex gap-3 mt-5">
                    <div>
                      <p className="font-semibold">Do you have Donate Blood</p>
                    </div>

                    <div class="flex items-center mr-4">
                      <input
                        id="yes-radio"
                        type="radio"
                        value={true}
                        onChange={() => {
                          setHasDonated(true);
                        }}
                        required={true}
                        name="donation-radio-group"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="yes-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Yes
                      </label>
                    </div>
                    <div class="flex items-center mr-4">
                      <input
                        id="no-radio"
                        type="radio"
                        value={false}
                        onChange={() => {
                          setHasDonated(false);
                        }}
                        name="donation-radio-group"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        for="no-radio"
                        class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        No
                      </label>
                    </div>
                  </div>
                  <div className="w-1/2 my-2">
                    <div class="">
                      <div className="">
                        <p className="font-semibold">
                          What was the last time you donated blood?
                        </p>
                      </div>
                      <div className="flex-col w-full">
                        <div className="flex border-2 justify-center items-center">
                          <DatePicker
                            selected={donatedDate}
                            onChange={(date) => setDonatedDate(date)}
                            dateFormat="yyyy/MM/dd"
                            isClearable
                            placeholderText="Select year"
                            maxDate={maxDate}
                            className="rounded-md w-full"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6 mr-5"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
                            />
                          </svg>
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs"
                          name="date"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex w-full gap-3 my-3">
                    <div className="flex-col w-full">
                      <div className="ll">
                        <p className="font-semibold">
                          In the last six months have you had any of the
                          following?
                        </p>
                      </div>
                      <div class="p-2">
                        <div class="items-center mr-4">
                          <input
                            id="tattoo-radio"
                            type="radio"
                            value={hasTattoo}
                            onChange={() => {
                              if (!hasTattoo) {
                                setHasTattoo(true);
                              } else {
                                setHasTattoo(false);
                              }
                            }}
                            name="tattoo-radio-group"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="tattoo-radio"
                            class="ml-2 text-sm font-medium text-gray-900"
                          >
                            Tattooing
                          </label>
                        </div>
                        <div class="items-center mr-4">
                          <input
                            id="ear-piercing-radio"
                            type="radio"
                            value={hasEarPiercing}
                            onChange={() => {
                              if (!hasEarPiercing) {
                                setHasEarPiercing(true);
                              } else {
                                setHasEarPiercing(false);
                              }
                            }}
                            name="ear-piercing-radio-group"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="ear-piercing-radio"
                            class="ml-2 text-sm font-medium text-gray-900"
                          >
                            Ear piercing
                          </label>
                        </div>
                        <div class="items-center mr-4">
                          <input
                            id="dental-radio"
                            type="radio"
                            value={dental}
                            onChange={() => {
                              if (!dental) {
                                setDental(true);
                              } else {
                                setDental(false);
                              }
                            }}
                            name="dental-radio-group"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label
                            for="dental-radio"
                            class="ml-2 text-sm font-medium text-gray-900"
                          >
                            Dental extraction
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">
                        Attach the Recent Medical Document
                      </p>
                    </div>
                    <div className="ll">
                      {" "}
                      <input
                        class="block w-full text-sm border-2 my-2"
                        id="file_input"
                        type="file"
                        onChange={(event) => {
                          console.log(event.target.files);
                          const file = event.target.files[0].name;
                          setMedicalDocument(file);
                        }}
                      />
                    </div>
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
                      className="bg-green-800 w-1/2 text-white py-3 hover:bg-green-500"
                      type="submit"
                    >
                      Update
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Modal>
          <div className="flex w-1/2 mr-3">
            {formLoading ? (
              <div className="flex w-1/2">
                <ClipLoader />
              </div>
            ) : (
              <div className="mt-5 pb-10">
                <Formik
                  initialValues={{
                    firstName: userData?.firstName,
                    lastName: userData?.lastName,
                    email: userData?.email,
                    gender: userData?.gender,
                    bloodGroup: userData?.bloodGroup,
                    contact: userData?.contact,
                    age: userData?.age,
                    password: userData?.password,
                    NIC: userData?.NIC,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <div className="flex gap-3">
                        <div className="flex-col w-1/2">
                          <div className="">
                            {" "}
                            <p className="font-semibold">First Name</p>
                          </div>
                          <div className="ll">
                            {" "}
                            <Field
                              className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                              type="text"
                              name="firstName"
                              touched={touched.firstName}
                              required={true}
                            />
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="firstName"
                          />
                        </div>
                        <div className="flex-col w-1/2">
                          <div className="ll">
                            {" "}
                            <p className="font-semibold">Last Name</p>
                          </div>
                          <div className="ll">
                            {" "}
                            <Field
                              className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                              type="text"
                              name="lastName"
                            />
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="lastName"
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <div className="flex-col w-2/3">
                          <div className="ll">
                            {" "}
                            <p className="font-semibold">Email</p>
                          </div>
                          <div className="ll">
                            {" "}
                            <Field
                              className="border border-grey-dark text-sm p-3  rounded-md w-full"
                              type="email"
                              name="email"
                            />
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="email"
                          />
                        </div>
                        {/* <div className="flex-col w-1/3">
                          <div className="ll">
                            <p className="font-semibold">Gender</p>
                          </div>
                          <div className="ll">
                            <select
                              className="w-full outline-2 border p-3"
                              value={gender}
                              onChange={(event) => {
                                setGender(event.target.value);
                              }}
                              required={true}
                            >
                              <option className="p-3" value="">
                                -select-
                              </option>
                              <option className="p-3" value="male">
                                Male
                              </option>
                              <option className="p-3" value="female">
                                Female
                              </option>
                            </select>
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="gender"
                          />
                        </div> */}
                      </div>

                      <div className="flex w-full gap-3 my-3 ">
                        <div className="flex-col w-1/2">
                          <div className="ll">
                            {" "}
                            <p className="font-semibold">NIC</p>
                          </div>
                          <div className="ll">
                            {" "}
                            <Field
                              className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                              type="number"
                              name="NIC"
                              maxLength={12}
                            />
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="NIC"
                          />
                        </div>
                        {/* <div className="flex-col w-1/3">
                          <div className="ll">
                            {" "}
                            <p className="font-semibold">Age</p>
                          </div>
                          <div className="ll">
                            {" "}
                            <Field
                              className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                              type="number"
                              name="age"
                            />
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="age"
                          />
                        </div> */}
                        <div className="flex-col w-1/3">
                          <div className="ll">
                            <p className="font-semibold">Blood Group</p>
                          </div>
                          <div className="ll">
                            <select
                              className="w-full outline-2 border p-3"
                              value={bloodGroup}
                              onChange={(event) => {
                                setBloodGroup(event.target.value);
                              }}
                            >
                              <option className="p-3" value="">
                                -select-
                              </option>
                              <option className="p-3" value="A+">
                                A+
                              </option>
                              <option className="p-3" value="B">
                                B
                              </option>
                            </select>
                          </div>

                          <ErrorMessage
                            component="div"
                            className="text-red-500 text-xs"
                            name="gender"
                          />
                        </div>
                      </div>

                      <div className="flex-col w-full">
                        <div className="ll">
                          {" "}
                          <p className="font-semibold">Phone Number</p>
                        </div>
                        <div className="ll">
                          {" "}
                          <div className="">
                            <PhoneInput
                              id="Mobile Number"
                              name="mobileNumber"
                              className="border border-grey-dark text-sm p-4 my-3 outline-none rounded-md"
                              placeholder="Enter phone number"
                              international
                              defaultCountry="LK"
                              value={phone}
                              onChange={setPhone}
                              countryCallingCodeEditable={false}
                              limitMaxLength={true}
                            />
                          </div>
                        </div>

                        <ErrorMessage
                          component="div"
                          className="text-red-500 text-xs"
                          name="phone"
                        />
                      </div>

                      <button
                        className="bg-red-950 text-white w-full py-2 mt-2 hover:text-red-900 border-2
                      "
                        type="submit"
                      >
                        {isLoading ? (
                          <ClipLoader
                            color="#fff"
                            loading={isLoading}
                            size={20}
                          />
                        ) : (
                          "Update"
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
