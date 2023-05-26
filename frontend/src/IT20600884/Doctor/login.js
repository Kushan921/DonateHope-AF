import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "../../IT20620202/UserView/componenent/header";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const DoctorLogin = () => {
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string().required("Required"),
  });
  const onSubmit = (values) => {
    setIsLoading(true);
    if (values.email == "admin@gmail.com" && values.password == "1234") {
      navigate("/dashboard");
    } else {
      
      const responses = axios

        .post(`http://localhost:8020/doctor/login`, {
          email: values.email,
          password: values.password,
        })
        .then((response) => {
          setIsLoading(false);
          alert("Login Successfully")
          navigate("/doctors")
        })
        .catch((err) => {
          setIsLoading(false);
          alert("Invalid Credentials")
        })
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
                  <h2 className="text-red-800 font-bold text-3xl mb-10 text-center">Doctor Login</h2>
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

                  <button
                    className="bg-red-950 text-white w-full py-2 mt-2 hover:bg-white hover:text-red-900 border-2
                "
                    type="submit"
                  >
                    {isLoading ? (
                      <ClipLoader color="#fff" loading={isLoading} size={20} />
                    ) : (
                      "Logins"
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

export default DoctorLogin;
