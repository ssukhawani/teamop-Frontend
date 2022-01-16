import React, { useState } from "react";
import { useDispatch} from "react-redux";
import {  useNavigate } from "react-router-dom";
import LoginSvg1 from "Shared/Icons/LoginSvg1";
import LoginSvg2 from "Shared/Icons/LoginSvg2";
import LoginSvg3 from "Shared/Icons/LoginSvg3";
import { updateState } from "Slices/login/loginSlice";

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    email:"admin@teamop.us",
    password:"teamopisreallyop"
  })


  const handelOnChange=(prop)=>(e)=>{
    const {value} = e.target;
    setUserData({...userData,[prop]:value})
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(updateState(userData))
    navigate("/home")
    // if (email && password) {
    //   LoginApi(payload);
    // }
    localStorage.setItem("userData", JSON.stringify(userData));
  };


  const { email, password } = userData;

  return ( 
    <div>
      <section className="bg-white {-- h-screen --}">
        <div className="mx-auto flex lg:justify-center h-full flex-col lg:flex-row">
          <div className="w-full lg:w-1/2 px-2 py-20 sm:py-40 sm:px-12 flex flex-col justify-center items-center bg-indigo-600 relative">
            <div className="absolute left-0 top-0 pl-3 pt-3">
              <LoginSvg1/>
            </div>
            <div className="flex relative z-30 flex-col justify-center px-4 md:pr-12">
              <div className="px-2 flex flex-col items-center justify-center">
              <LoginSvg2/>
              </div>
              <h3 className="text-4xl pt-8 leading-tight text-white text-center">
                Better Charge
              </h3>
            </div>
            <div className="absolute right-0 bottom-0">
              <LoginSvg3/>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            class="w-full lg:w-1/2 flex justify-center bg-white dark:bg-gray-900"
          >
            <div class="w-full sm:w-4/6 md:w-3/6 lg:w-2/3 text-gray-800 dark:text-gray-100 flex flex-col justify-center px-2 sm:px-0 py-16">
              <div class="px-2 sm:px-6">
                <h3 class="text-2xl sm:text-3xl md:text-2xl font-bold leading-tight">
                  Login To Your Account
                </h3>
              </div>
              <div class="mt-8 w-full px-2 sm:px-6">
                <div class="flex flex-col mt-8">
                  <label
                    for="email"
                    class="text-lg font-semibold leading-tight"
                  >
                    Email
                  </label>
                  <input
                    required
                    aria-required="true"
                    type="email"
                    value={email}
                    onChange={handelOnChange("email")}
                    class="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-300 border shadow"
                  />
                </div>
                <div class="flex flex-col mt-5">
                  <label
                    for="password"
                    class="text-lg font-semibold fleading-tight"
                  >
                    Password
                  </label>
                  <input
                    onChange={handelOnChange("password")}
                    value={password}
                    required
                    aria-required="true"
                    type="password"
                    class="h-10 px-2 w-full rounded mt-2 text-gray-600 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-300 border shadow"
                  />
                </div>
              </div>
              <div class="pt-6 w-full flex justify-between px-2 sm:px-6">
                <div class="flex items-center">
                  <input
                    id="rememberme"
                    name="rememberme"
                    class="w-3 h-3 mr-2"
                    type="checkbox"
                  />
                  <label for="rememberme" class="text-xs">
                    Remember Me
                  </label>
                </div>
                <a class="text-xs text-indigo-600" href="/#">
                  Forgot Password?
                </a>
              </div>
              <div class="px-2 sm:px-6">
                <button
                  type="submit"
                  class="focus:outline-none w-full sm:w-auto bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-8 py-3 text-sm mt-6"
                  style={{ backgroundColor: "rgba(79, 70, 229) " }}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};
export default Login;
