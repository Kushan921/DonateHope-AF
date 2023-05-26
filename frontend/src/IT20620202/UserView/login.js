import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Header } from "./componenent/header";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-toastify";

const LoginUser = () => {
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

    const response = axios
      .post("http://localhost:8020/donor/login", values)
      .then((res) => {
        console.log(res.data);
        toast.success("Login Success");
        setIsLoading(false);
        localStorage.setItem("isLoggedIn", true);
        localStorage.setItem("userId", res.data._id);
        navigate("/");
      })
      .catch((err) => {
        toast.error("Password or Email is incorrect");
        setIsLoading(false);
      });
  };
  return (
    <div>
      <Header />
      <div className="flex w-full justify-center max-h-screen">
        <div className=" w-1/2 shadow-lg p-2 mt-10">
          <div className="w-full text-center text-2xl font-bold text-red-800 bg-yellow-100 py-2">
            <p>Login Here</p>
          </div>
          <div className="p-10">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex-col w-full my-3">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold my-2">Email</p>
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

                  <div className="flex-col my-3">
                    <div className="ll">
                      {" "}
                      <p className="font-semibold my-2">Password</p>
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
                    className="bg-red-950 text-white w-full py-2 mt-2
                "
                    type="submit"
                  >
                    {isLoading ? (
                      <ClipLoader color="#fff" loading={isLoading} size={20} />
                    ) : (
                      "Login"
                    )}
                  </button>
                  <div className="text-center mt-3">
                    <a
                      href="/signin"
                      variant="body2"
                      className="text-yellow-900 hover:text-yellow-700 underline"
                    >
                      {"Don't have an account? Sign Up"}
                    </a>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUser;
