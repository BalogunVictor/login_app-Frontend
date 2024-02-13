import { useFormik } from "formik";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

const Username = () => {
  const navigate = useNavigate();
  const setUsername = useAuthStore((state) => state.setUsername);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate: usernameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setUsername(values.username);
      navigate("/password");
    },
  });

  return (
    <div className="container w-1/2 mx-auto mt-10">
      <Toaster position="top-center"></Toaster>

      <div className="title flex flex-col items-center">
        <h4 className="text-2xl sm:text-5xl font-bold">Hello Again!</h4>
        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
          Explore More by connecting with us.
        </span>
      </div>

      <form className="text-xl" onSubmit={formik.handleSubmit}>
        <div className="mt-2">
          <label for="username">Username</label>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            placeholder="Username*"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="btn p-1 bg-gray-800 text-white w-full rounded-full h-12 font-bold outline-none tracking-wide"
          >
            Let's Go
          </button>
        </div>

        <div className="text-center py-4">
          <span className="text-gray-500">
            Not a Member{" "}
            <Link className="text-red-500" to="/register">
              Register Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Username;
