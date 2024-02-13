import { useFormik } from "formik";
import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { Navigate, useNavigate } from "react-router-dom";
import { resetPassword } from "../helper/helper";
import { resetPasswordValidation } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";

import styles from "../styles/Username.module.css";

export default function Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, status, serverError }] = useFetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
      confirm_pwd: "admin@123",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully...!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/password");
      });
    },
  });

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status && status !== 201)
    return <Navigate to={"/password"} replace={true}></Navigate>;

  return (
    <div className="container w-1/2 mx-auto mt-10">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="title flex flex-col items-center">
        <h4 className="text-5xl font-bold">Reset</h4>
        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
          Enter new password.
        </span>
      </div>

      <form className="text-xl">
        <div className="mt-2">
          <label for="username">Password</label>
          <input
            {...formik.getFieldProps("password")}
            type="text"
            placeholder="New Password"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>
        <div className="mt-2">
          <label for="username">Comfirm Password</label>
          <input
            {...formik.getFieldProps("confirm_pwd")}
            type="text"
            placeholder="Repeat Passwood"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="btn p-1 bg-gray-800 text-white w-full rounded-full h-12 font-bold outline-none tracking-wide"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
