import { Select, Button } from "antd";
import React, { useState, useEffect } from "react";
import { DateSelector, Slot } from "./style";
import { DatePicker } from "antd";
import moment from "moment";
export default function Detail() {
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
    <main className="flex items-center p-10 w-full h-full bg-white">
      <div className="border-t border-b pt-16 grid grid-cols-2 gap-1">
        <div className="flex flex-col justify-start" style={{ width: "80%" }}>
          <div
            className="flex flex-col w-full object-cover h-5/6 justify-items-start border rounded-lg overflow-hidden"
            style={{ minHeigth: "320px" }}
          >
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
              alt="nike shoes"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex flex-col gap-4">
            <h1 className="capitalize text-4xl font-extrabold">
              First Ev Station
            </h1>
            <h2 className="text-3xl">$44</h2>
            <p className="text-lg text-gray-500	">
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
            <div className="flex items-center gap-4 my-6 cursor-pointer ">
              <div
                className=" px-5 py-3 text-white rounded-lg w-1/4 text-center align-items-center "
                style={{ backgroundColor: "#5F7DF2" }}
              >
                Book
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
