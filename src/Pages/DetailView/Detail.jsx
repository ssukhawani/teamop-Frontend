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
  console.log(state, "index");

  const optionsData = [];
  const [options, setOptions] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [date, setDate] = useState(moment());
  function onChange(value, option) {
    console.log(option["value"]);

    console.log(`selected ${option}`);
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
  return (
    <DashboardLayout>
      <main className="flex items-center p-10 w-full h-full bg-white">
        <div className="border-b pt-4 grid md:grid-cols-2 gap-1">
          <div className="flex flex-col w-5/6" >
            <div
              className="flex flex-col w-full object-cover h-3/4 border rounded-lg overflow-hidden"
            >
              <img
                className="w-full h-full object-cover"
                src={`https://robohash.org/${state}.png`}
                alt="nike shoes"
              />
            </div>
          </div>

          <div className="flex flex-col w-full">
            <div className="flex flex-col gap-4 px-6">
              <h1 className="capitalize text-xl md:text-4xl font-extrabold">
                First Ev Station
              </h1>
              <h2 className="text-indigo-700 text-sm md:text-xl font-semibold">150₹/hr</h2>
              <p className="text-xs md:text-base text-gray-500	">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Voluptatibus voluptatum nisi maxime obcaecati impedit? Ratione
                error eum qui quidem? Veniam accusamus ea repudiandae itaque,
                explicabo quidem perspiciatis. Culpa, asperiores deserunt.
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
