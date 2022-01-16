import { Select,  } from "antd";
import React, { useState, useEffect } from "react";
import { DateSelector, Slot } from "./style";
import { DatePicker } from "antd";
import moment from "moment";
import DashboardLayout from "Shared/Dashboard/Dashboard";
import { useLocation } from "react-router-dom";
import { Button } from "Pages/Home/Home";
export default function Detail() {
  const { state } = useLocation();

  const optionsData = [];
  const [isloading, setIsLoading] = useState(true);
  const [date, setDate] = useState(moment());
  function onChange(value, option) {
    // console.log(option["value"]);
    // console.log(`selected ${option}`);
  }

  function onDateChange(date, dateString) {
    setDate(date);
    if (date == null) {
      setIsLoading(true);
    } else setIsLoading(false);
  }

  const checkSlot = () => {
    if (date) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (date !== null) {
      setIsLoading(false);
    }
    return null;
  }, []);

  const {evStationName,evStationAddress,rating,city,state:evState,country} = state?.station

  return (
    <DashboardLayout>
      <main className="flex items-center p-10 py-6 w-full h-full bg-white">
        <div className="pt-4 grid md:grid-cols-2 gap-1">
          <div className="flex flex-col w-5/6" >
            <div
              className="flex flex-col w-full object-cover h-3/4 border rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-full object-cover"
                src={`https://robohash.org/${state?.index}.png`}
                alt="nike shoes"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-4 px-6">
              <div className="flex items-center justify-between">
              <h1 className="capitalize text-xl md:text-4xl font-extrabold pr-3">
               {evStationName} 
              </h1>
              <span className="text-lg font-semibold">{rating}⭐</span>
              </div>
              <div className="flex items-center">
              <h2 className="text-indigo-700 text-sm md:text-xl font-semibold pr-3">150₹/hr</h2>
              <div className="flex">
              <div>
                <p className="text-xs text-gray-600 px-2 py-1 bg-gray-300 rounded-sm">
                Two wheeler
                </p>
              </div>
              <div className="pl-1  md:pl-2">
                <p className="text-xs text-gray-600 px-2 py-1 bg-gray-300 rounded-sm">
                Four wheeler
                </p>
              </div>
            </div>
              </div>
              <p className="text-xs md:text-base text-gray-500	">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus voluptatum? Ratione
                explicabo quidem perspiciatis.{city} {evState}, {country}
              </p>
              <Slot>
                <h2>Book your slot</h2>
                <DateSelector>
                  <DatePicker
                    onChange={onDateChange}
                    value={date}
                    disabledDate={(current) =>
                      current && current < moment().subtract(1, "days")
                    }
                  />
                  <Button disabled={isloading} onClick={checkSlot}>
                    Check availability
                  </Button>
                </DateSelector>
                <Select
                  disabled={isloading}
                  placeholder="Available slots"
                  onChange={onChange}
                  options={optionsData}
                  style={{ fontSize: "16px", padding: "8px 0px", width: 244 }}
                />
              </Slot>
              {/* <div className="flex items-center gap-4 my-6 cursor-pointer ">
                <div
                  className="text-base bg-indigo-600 py-4 text-white rounded-lg w-full text-center items-center "
                >
                  Book Now
                </div>
              </div> */}
              <Button> Book Now</Button>
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
