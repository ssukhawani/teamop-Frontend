import { Select, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { DateSelector, Slot } from "./style";
import { DatePicker } from "antd";
import moment from "moment";
import { getItemSlotsApi, postBookingSlot } from "Services/Service";
import DashboardLayout from "Shared/Dashboard/Dashboard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "Pages/Home/Home";

export default function Detail() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);
  const [optionData, setOptionData] = useState({
    key: null,
    value: null,
    label: null,
  });

  const [evSlotId, setEvSlotId] = useState(null);
  const [cardData] = useState(state?.station);
  const [isloading, setIsLoading] = useState({
    pageLoading: false,
    dateLoading: false,
  });
  const [date, setDate] = useState(moment());

  const {
    evStationName,
    rating,
    city,
    country,
    state: evState,
  } = cardData;

  function onChange(value, option) {
    // console.log(option["value"]);
    // console.log(`selected ${option}`);
    setEvSlotId(option["key"]);
    setOptionData(option);
  }

  function onDateChange(date, dateString) {
    setOptions([]);
    setOptionData({ key: null, value: null, label: null });

    setDate(date);
  }

  const {evStationSlots:[obj1] } = state?.station

  const checkSlot = () => {
    if (date) {
      setIsLoading({ ...isloading, dateLoading: true });
      Promise.resolve(
        getItemSlotsApi(state?.station?.evStationId, date.format("YYYY-MM-DD"))
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
        setIsLoading({ ...isloading, dateLoading: false });
      });
    }
  };
  useEffect(() => {
    Promise.resolve(
      getItemSlotsApi(cardData?.evStationId, date.format("YYYY-MM-DD"))
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
  }, []);

  const handelBookNow = () => {
    setIsLoading({ ...isloading, pageLoading: true });
    Promise.resolve(postBookingSlot("1", evSlotId, date.format("YYYY-MM-DD")))
      .then(({ data }) => {
        setIsLoading({ ...isloading, pageLoading: false });
        navigate("/success");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading({ ...isloading, pageLoading: false });
      });
  };

  return (
    <DashboardLayout>
      <main className="flex items-center p-10 py-6 w-full h-full bg-white">
        <div className="pt-4 grid md:grid-cols-2 gap-1">
          <div className="flex flex-col w-5/6">
            <div className="flex flex-col w-full object-cover h-3/4 border rounded-lg overflow-hidden">
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
                <h2 className="text-indigo-700 text-sm md:text-xl font-semibold pr-3">
                {obj1["ChargesPerHour"]} ₹/hr
                </h2>
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
                {city} {evState}, {country}
              </p>
              <p className="text-xs md:text-base text-gray-500	">
                We are here to power your EV, with our Next Gen Ev charger <br></br>
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
                  {isloading.dateLoading ? (
                    <Button style={{ background: "whitesmoke" }}>
                      <Spin size="small" style={{ color: "purple" }} />
                    </Button>
                  ) : (
                    <Button
                      disabled={isloading.dateLoading}
                      onClick={checkSlot}
                    >
                      Check availability
                    </Button>
                  )}
                </DateSelector>
                <Select
                  disabled={isloading.dateLoading}
                  placeholder="Available slots"
                  onChange={onChange}
                  options={options}
                  value={optionData}
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

              {isloading.pageLoading ? (
                <Button style={{ background: "whitesmoke" }}>
                  <Spin size="small" style={{ color: "purple" }} />
                </Button>
              ) : (
                <Button disabled={!optionData.key} onClick={handelBookNow}> Book Now</Button>
              )}
            </div>
          </div>
        </div>
      </main>
    </DashboardLayout>
  );
}
