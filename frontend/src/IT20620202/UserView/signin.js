import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "./componenent/header";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { toast } from "react-toastify";

const SignUpUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = React.useState(null);
  const [bloodGroup, setBloodGroup] = React.useState(null);
  const [phone, setPhone] = React.useState();

  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required Name"),
    lastName: Yup.string().required("Required Name"),
    NIC: Yup.string()
      .length(12, "NIC must be exactly 12 digits")
      .required("NIC is required"),
    age: Yup.number().required("Required Age"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string().required("Required Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });
  const onSubmit = (values) => {
    setIsLoading(true);
    console.log(values);
    console.log(phone);
    console.log(bloodGroup);
    console.log(gender);
    const responses = axios

      .post(`http://localhost:8020/donor/register`, {
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
        toast.success("User Added Successfully");
        navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        alert("user not Added");
        setIsLoading(false);
      });
  };
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center max-h-screen">
        <div className=" w-1/2 shadow-lg p-2 mt-10">
          <div className="w-full text-center text-2xl font-bold text-red-800 bg-yellow-100 py-2">
            <p>Register Here</p>
          </div>
          <div className="p-10">
            <Formik
              initialValues={initialValues}
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
                    <div className="flex-col w-1/3">
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
                    </div>
                  </div>

                  <div className="flex w-full gap-3 my-3 ">
                    <div className="flex-col w-2/3">
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
                    <div className="flex-col w-1/3">
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
                    </div>
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

                  <div className="flex-col">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Password</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1 rounded-md w-full"
                        type="password"
                        name="password"
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs italic"
                      name="password"
                    />
                  </div>
                  <div>
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Confirm Password</p>
                    </div>
                    <div className="ll w-full">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-3  rounded-md w-full"
                        type="password"
                        name="confirmPassword"
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs italic"
                      name="confirmPassword"
                    />
                  </div>

                  <button
                    className="bg-red-950 text-white w-full py-2 mt-2 hover:text-red-900 border-2
                "
                    type="submit"
                  >
                    {isLoading ? (
                      <ClipLoader color="#fff" loading={isLoading} size={20} />
                    ) : (
                      "Register"
                    )}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpUser;
