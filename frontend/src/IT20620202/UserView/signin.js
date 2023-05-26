import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "./componenent/header";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const SignUpUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [gender, setGender] = React.useState(null);

  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Required Name"),
    age: Yup.number().required("Required Age"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string()
      .matches(/^0\d{9}$/, {
        message: "Phone number must start with 0 and have exactly 10 digits",
      })
      .required("Phone number is required"),
    password: Yup.string().required("Required Password"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });
  const onSubmit = (values) => {
    setIsLoading(true);
    if (values.email == "admin@gmail.com" && values.password == "1234") {
      navigate("/dashboard");
    } else {
      const responses = axios

        .post(`http://localhost:8020/user/login`, {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setIsLoading(false);
        })
        .catch(setIsLoading(false));
    }
  };
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center max-h-screen">
        <div className=" w-1/2 shadow-lg p-2 mt-10">
          <div className="p-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
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
                      />
                    </div>

                    <ErrorMessage
                      component="div"
                      className="text-red-500 text-xs"
                      name="name"
                    />
                  </div>
                  <div className="flex-col w-full">
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
                  <div className="flex-col w-full">
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
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Email</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
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
                  <div className="flex-col w-full">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold">Phone Number</p>
                    </div>
                    <div className="ll">
                      {" "}
                      <Field
                        className="border border-grey-dark text-sm p-3 my-1  rounded-md w-full"
                        type="phone"
                        name="phone"
                      />
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
                    className="bg-red-950 text-white w-full py-2 mt-2 hover:bg-white hover:text-red-900 border-2
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
