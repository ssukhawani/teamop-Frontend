import { Select, Button, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { DateSelector, Slot } from "./style";
import { DatePicker } from "antd";
import moment from "moment";
import { getItemApi, getItemSlotsApi } from "Services/Service";

const initialValues = {
  evStationName: "",
  evStationAddress: "",
  rating: "",
  areaCode: "",
  city: "",
  country: "",
  state: "",
  phone: "",
};

export default function Detail() {
  const [options, setOptions] = useState([]);
  const [cardData, setCardData] = useState(initialValues);
  const [isloading, setIsLoading] = useState({
    pageLoading: true,
    dateLoading: true,
  });
  const { pageLoading, dateLoading } = isloading;
  const [date, setDate] = useState(moment());

  const {
    evStationName,
    evStationAddress,
    rating,
    areaCode,
    city,
    country,
    state,
    phone,
  } = cardData;

  function onChange(value, option) {
    console.log(option["value"]);

    console.log(`selected ${option}`);
  }

  function onDateChange(date, dateString) {
    setDate(date);
    Promise.resolve(
      getItemSlotsApi(cardData.evStationId, date.format("YYYY-MM-DD"))
    ).then(({ data }) => {
      const refinedSlotOptions =
        data.response.available_evs_slots_info.evStationSlots.map((item) => {
          return {
            label: item.startHours + " - " + item.endHours,
            key: item.id,
            value: item.startHours + " - " + item.endHours,
          };
        });
      setOptions(refinedSlotOptions);
    });
    if (date == null) {
      setIsLoading(true);
    } else setIsLoading(false);
  }

  const checkSlot = () => {
    if (date) {
      setIsLoading({ ...isloading, dateLoading: false });
    }
  };
  useEffect(() => {
    Promise.resolve(
      getItemApi(1).then(({ data }) => {
        setCardData(data.response[0]);
        setIsLoading({ ...isloading, pageLoading: false });
        Promise.resolve(
          getItemSlotsApi(
            data.response[0].evStationId,
            date.format("YYYY-MM-DD")
          )
        ).then(({ data }) => {
          const refinedSlotOptions =
            data.response.available_evs_slots_info.evStationSlots.map(
              (item) => {
                return {
                  label: item.startHours + " - " + item.endHours,
                  key: item.id,
                  value: item.startHours + " - " + item.endHours,
                };
              }
            );
          setOptions(refinedSlotOptions);
        });
      })
    );
  }, []);

  return (
    <main className="flex items-center p-10 w-full h-full bg-white">
      {!pageLoading ? (
        <div className="border-t border-b pt-16 grid grid-cols-2 gap-1">
          <div className="flex flex-col justify-start" style={{ width: "80%" }}>
            <div
              className="flex flex-col w-full object-cover h-5/6 justify-items-start border rounded-lg overflow-hidden"
              style={{ minHeight: "320px" }}
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
                {evStationName}
              </h1>
              <h2 className="text-3xl">
                {cardData?.evStationSlots !== undefined
                  ? cardData?.evStationSlots[0].ChargesPerHour
                  : null}{" "}
                Rs / hr
              </h2>
              <p className="text-lg text-gray-500	">
                Address: {evStationAddress} , {areaCode} , {city} , {state}
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
                  <Button disabled={false} onClick={checkSlot}>
                    Check availability
                  </Button>
                </DateSelector>
                <Select
                  // disabled={dateLoading}
                  placeholder="Available slots"
                  onChange={onChange}
                  options={options}
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
      ) : (
        <Spin style={{ marginLeft: "45%" }} />
      )}
    </main>
  );
}
