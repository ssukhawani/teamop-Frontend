import React, { useState } from "react";
import BigNotificationIcon from "Shared/Icons/BigNotificationIcon";
import BrandIcon from "Shared/Icons/BrandIcon";
import CrossIcon from "Shared/Icons/CrossIcon";
import DashboardIcon from "Shared/Icons/Dashboard";
import LogOutIcon from "Shared/Icons/LogOutIcon";
import SmallNotificationIcon from "Shared/Icons/SmallNotificationIcon";
import CoolPinkySVG from "Assets/cool_pinky.svg";
import DownArrow from "Shared/Icons/DownArrow";
import HamburgerIcon from "Shared/Icons/Hamburger";
import UserIcon from "Shared/Icons/UserIcon";
import NotificationIcon from "Shared/Icons/NotificationIcon";
import Transaction from "Shared/Icons/Transaction";
import { useNavigate } from 'react-router-dom';

export default function DashboardLayout({ children }) {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const navigate = useNavigate();


  const handelLogOut=()=>{
    localStorage.clear();
    navigate("/");
  }

  return (
    <>
      <div className="w-full max-h-screen bg-gray-200 overflow-y-hidden">
        <div className="flex flex-no-wrap">
          {/* Sidebar starts */}
          <div className="absolute lg:relative w-64 h-screen shadow bg-gray-100 hidden lg:block">
            <div className="h-16 w-full flex items-center px-8">
              <BrandIcon />
            </div>

            <div className="mt-6 flex flex-col justify-start items-center  px-4 w-full space-y-3 pb-5 ">
                    <button onClick={()=>navigate("/home")} className="focus:outline-none flex jusitfy-start hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-800 rounded py-3 pl-4 items-center space-x-6 w-full ">
                        <DashboardIcon/>
                        <p className="text-base leading-4 ">Dashboard</p>
                    </button>
                    {/* <button  onClick={()=>navigate("/transactions")} className="flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-800 rounded py-3 pl-4   w-full ">
                        <Transaction/>
                        <p className="text-base leading-4">Transactions</p>
                    </button> */}
                    <button className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-800 rounded  py-3 pl-4   w-full ">
                        <NotificationIcon/>
                        <p className="text-base leading-4  ">Notifications</p>
                    </button>
                    <button onClick={()=>navigate("/evcard")} className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-800 rounded  py-3 pl-4   w-full ">
                    <Transaction/>
                        <p className="text-base leading-4  ">EV Card</p>
                    </button>
                    <button onClick={handelLogOut} className="focus:outline-none flex justify-start items-center space-x-6 hover:text-white focus:bg-indigo-700 focus:text-white hover:bg-indigo-700 text-gray-800 rounded  py-3 pl-4   w-full ">
                        <LogOutIcon/>
                        <p className="text-base leading-4  ">Logout</p>
                    </button>
                </div>
          </div>
          {/*Mobile responsive sidebar*/}
          <div
            className={
              show
                ? "w-full h-full absolute z-40  transform  translate-x-0 "
                : "   w-full h-full absolute z-40  transform -translate-x-full"
            }
            id="mobile-nav"
          >
            <div
              className="bg-gray-800 opacity-50 absolute h-full w-full lg:hidden"
              onClick={() => setShow(!show)}
            />
            <div className="absolute z-40 sm:relative w-64 md:w-96 shadow pb-4 bg-gray-100 lg:hidden transition duration-150 ease-in-out h-full">
              <div className="flex flex-col justify-between h-full w-full">
                <div>
                  <div className="flex items-center justify-between px-8">
                    <div className="h-16 w-full flex items-center">
                      <BrandIcon />
                    </div>
                    <div
                      id="closeSideBar"
                      className="flex items-center justify-center h-10 w-10 cursor-pointer"
                      onClick={() => setShow(!show)}
                    >
                      <CrossIcon />
                    </div>
                  </div>
                  <ul ariaOrientation="vertical" className=" py-6">
                    <li className="pl-6 cursor-pointer text-sm leading-3 tracking-normal pb-4 pt-5 text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <div className="flex items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          <DashboardIcon />
                        </div>
                        <span className="ml-2 xl:text-base md:text-2xl text-base">
                          Dashboard
                        </span>
                      </div>
                    </li>

                    <li className="pl-6 cursor-pointer text-gray-600 text-sm leading-3 tracking-normal py-2 hover:text-indigo-700 focus:text-indigo-700 focus:outline-none">
                      <div className="flex items-center">
                        <div className="w-6 h-6 md:w-8 md:h-8">
                          <LogOutIcon />
                        </div>
                        <span className="ml-2 xl:text-base md:text-2xl text-base">
                          Logout
                        </span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="w-full">
                  <div className="border-t border-gray-300">
                    <div className="w-full flex items-center justify-between px-6 pt-1">
                      <div className="flex items-center">
                        <img
                          alt="profile-pic"
                          src={CoolPinkySVG}
                          className="w-8 h-8 rounded-md"
                        />
                        <p className="md:text-xl text-gray-800 text-base leading-4 ml-2">
                          Cool Pinky
                        </p>
                      </div>
                      <ul className="flex">
                        <li className="cursor-pointer text-white pt-5 pb-3 pl-3">
                          <SmallNotificationIcon />
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Mobile responsive sidebar*/}
          {/* Sidebar ends */}
          <div className="w-full">
            {/* Navigation starts */}
            <nav className="h-16 flex items-center lg:items-stretch justify-end lg:justify-between bg-white shadow relative z-10">
              <div className="hidden lg:flex w-full pr-6">
                <div className="w-1/2 h-full hidden lg:flex items-center pl-6 pr-24"></div>
                <div className="w-1/2 hidden lg:flex">
                  <div className="w-full flex items-center pl-8 justify-end">
                    <div className="h-full w-20 flex items-center justify-center cursor-pointer">
                      <div className="relative cursor-pointer text-gray-600">
                        <BigNotificationIcon />
                        <div className="w-2 h-2 rounded-full bg-red-400 border border-white absolute inset-0 mt-1 mr-1 m-auto" />
                      </div>
                    </div>

                    <div
                      className="flex items-center relative cursor-pointer"
                      onClick={() => setProfile(!profile)}
                    >
                      <div className="rounded-full">
                        {profile ? (
                          <ul className="p-2 w-full border-r bg-white absolute rounded left-0 shadow mt-12 sm:mt-16 ">
                            <li className="flex w-full justify-between text-gray-600 hover:text-indigo-700 cursor-pointer items-center">
                              <div className="flex items-center">
                                <UserIcon />
                                <span className="text-sm ml-2">My Profile</span>
                              </div>
                            </li>
                          </ul>
                        ) : (
                          ""
                        )}
                        <div className="relative">
                          <img
                            className="rounded-full h-10 w-10 object-cover"
                            src={CoolPinkySVG}
                            alt="avatar"
                          />
                          <div className="w-2 h-2 rounded-full bg-green-400 border border-white absolute inset-0 mb-0 mr-0 m-auto" />
                        </div>
                      </div>
                      <p className="text-gray-800 text-sm mx-3">Cool Pinky</p>
                      <div className="cursor-pointer text-gray-600">
                        <DownArrow />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="text-gray-600 mr-8 visible lg:hidden relative"
                onClick={() => setShow(!show)}
              >
                {show ? " " : <HamburgerIcon />}
              </div>
            </nav>
            {/* Navigation ends */}
            {/* Remove class [ h-64 ] when adding a card block */}
            <div className="py-10 md:w-full w-screen mx-auto px-6 max-h-screen overflow-y-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

