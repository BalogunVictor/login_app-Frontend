import { useFormik } from "formik";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../assets/profile.png";
import convertToBase64 from "../helper/convert";
import { registerUser } from "../helper/helper";
import { registerValidations } from "../helper/validate";
import styles from "../styles/Username.module.css";

const Register = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
    validate: registerValidations,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully...!</b>,
        error: <b>Could not Register.</b>,
      });

      registerPromise.then(function () {
        navigate("/");
      });
    },
  });

  /** formik doesn't support file upload---created this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container w-1/2 mx-auto mt-5">
      <Toaster position="top-center"></Toaster>

      <div className="title flex flex-col items-center">
        <h4 className="text-5xl font-bold">Register</h4>
        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
          Happy to join you!
        </span>
      </div>

      <form className="text-xl" onSubmit={formik.handleSubmit}>
        <div className="profile flex justify-center py-4">
          <label htmlFor="profile">
            <img
              src={file || avatar}
              className={styles.profile_img}
              alt="avatar"
            />
          </label>

          <input onChange={onUpload} type="file" id="profile" name="profile" />
        </div>

        <div className="mt-2">
          <label for="email">Email</label>
          <input
            {...formik.getFieldProps("email")}
            type="text"
            placeholder="Email*"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>

        <div className="mt-2">
          <label for="username">Username</label>
          <input
            {...formik.getFieldProps("username")}
            type="text"
            placeholder="Username*"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>

        <div className="mt-2">
          <label for="password">Password</label>
          <input
            {...formik.getFieldProps("password")}
            type="password"
            placeholder="Password*"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="btn p-1 bg-gray-800 text-white w-full rounded-full h-12 font-bold outline-none tracking-wide"
          >
            Register
          </button>
        </div>
        <div className="text-center py-4">
          <span className="text-gray-500">
            Already Register?{" "}
            <Link className="text-red-500" to="/">
              Login Now
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Register;
