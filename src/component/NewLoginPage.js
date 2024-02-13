import React from "react";

const NewLoginPage = () => {
  return (
    <>
      <div className="container w-1/2 text-center mx-auto">
        <h1 className="tracking-wider w-full font-bolder mt-12 mb-0">
          <i className="fa fa-id-card" aria-hidden="true">
            {" "}
            Log in
          </i>
        </h1>
        <p className="mt-0 pt-1">
          Don't have an account?{" "}
          <a href="#" className="text-black underline">
            Sign up
          </a>
        </p>
        <button className="mt-5 bg-gray-500 rounded-full w-full h-12 tracking-wide border-black border-solid border-1 focus:outline-none font-                        bold">
          <i className="fa fa-github" aria-hidden="true"></i> Log in with GitHub
        </button>
      </div>

      <div className="container w-1/2 mx-auto mt-5">
        <form className="text-xl">
          <div className="mt-2">
            <label for="username">Username or email</label>
            <input
              type="text"
              id="username"
              className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
            />
          </div>

          <div className="mt-2">
            <label for="password" className="tracking-wide">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full h-8 bg-gray-200 border-solid border-2 border-black rounded block mt-2 tracking-widest pl-2"
            />
          </div>

          <div className="mt-10">
            <button className="btn p-1 bg-gray-800 text-white w-full rounded-full h-12 font-bold outline-none tracking-wide">
              Log in
            </button>
          </div>
        </form>
        <p className="mt-2 pt-1 text-center">
          <a href="#" className="text-black underline">
            Forgot your password?
          </a>
        </p>
      </div>
    </>
  );
};

export default NewLoginPage;
