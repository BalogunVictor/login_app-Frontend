import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { generateOTP, verifyOTP } from "../helper/helper";
import { useAuthStore } from "../store/store";

export default function Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    generateOTP(username).then((OTP) => {
      // console.log(OTP);
      if (OTP) return toast.success("OTP has been send to your email!");
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success("Verify Successfully!");
        return navigate("/reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP! Check email again!");
    }
  }

  // handler of resend OTP
  function resendOTP() {
    let sentPromise = generateOTP(username);

    toast.promise(sentPromise, {
      loading: "Sending...",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Could not Send it!</b>,
    });

    sentPromise.then((OTP) => {
      console.log(OTP);
    });
  }

  return (
    <div className="container w-1/2 mx-auto mt-5">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="title flex flex-col items-center">
        <h4 className="text-5xl font-bold">Recovery</h4>
        <span className="py-4 text-xl w-2/3 text-center text-gray-500">
          Enter OTP to recover password.
        </span>
      </div>

      <form className="text-xl" onSubmit={onSubmit}>
        <div className="input text-center">
          <span className="py-4 text-sm text-left text-gray-500">
            Enter 6 digit OTP sent to your email address.
          </span>
        </div>

        <div className="mt-2">
          <label for="username">OTP</label>
          <input
            onChange={(e) => setOTP(e.target.value)}
            type="text"
            placeholder="OTP"
            className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
          />
        </div>

        <div className="mt-10">
          <button className="btn p-1 bg-gray-800 text-white w-full rounded-full h-12 font-bold outline-none tracking-wide">
            Recover
          </button>
        </div>
      </form>

      <div className="text-center py-4">
        <span className="text-gray-500">
          Can't get OTP?{" "}
          <button onClick={resendOTP} className="text-red-500">
            Resend
          </button>
        </span>
      </div>
    </div>
  );
}
