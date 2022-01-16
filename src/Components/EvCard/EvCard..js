import React, { useState } from "react";
import BookmarkIcon from "Shared/Icons/Bookmark";
import InfoIcon from "Shared/Icons/InfoIcon";
import SmallTriangle from "Shared/Icons/SmallTriangle";

function EvCard({index,onClick}) {
    const [tooltipStatus, setTooltipStatus] = useState(0);

  const prop = {
    evStationId: 1,
    evStationName: "Delta EV",
    evStationAddress: "Postmaster, Post Office RAJKOT CITY",
    rating: 10,
    latitude: "13313",
    longitude: "23413",
    country: "India",
    state: "Gujarat",
    city: "Rajkot",
    areaCode: "99042",
    phone: "9904274495",
    evStationSlots: [
      {
        id: 1,
        isOccupied: true,
        ChargesPerHour: 100.0,
        startHours: "00:00:00",
        endHours: "23:59:00",
        isAvailable24Hours: true,
      },
    ],
  };

  const {evStationName,evStationAddress,rating,city,state,country} = prop

  return (
      <div className="flex h-52  md:h-full md:block md:mx-2 md:w-72 lg:mb-0 md:mb-8 shadow-sm hover:shadow-2xl cursor-pointer border-b-4 hover:border-black rounded-b-2xl" onClick={onClick}>
        <div className="overflow-hidden rounded-t-md bg-gray-300">
          <img
            src={`https://robohash.org/${index}.png`}
            alt="EvCard"
            className="w-full h-44 rounded-t-md hover:scale-125 transform duration-500"
          />
        </div>
        <div className="bg-white rounded-b-2xl">
          <div className="flex md:items-center justify-between px-4 pt-2 md:pt-4">
            <div>
              <BookmarkIcon />
            </div>
            <div className="bg-indigo-600 md:py-1.5 px-2 md:px-4 rounded-full flex justify-center items-center">
              <p className="text-xs text-white">Level One</p>
              <div className="relative md:mt-0" onMouseEnter={() => setTooltipStatus(1)} onMouseLeave={() => setTooltipStatus(0)}>
                    {tooltipStatus === 1 && (
                        <div role="tooltip" className="z-20 transition duration-150 ease-in-out bottom-0 mb-8 absolute shadow-lg pt-4 pr-2 pl-3 pb-5 bg-white text-gray-600 rounded w-40">
                            <SmallTriangle/>
                            <p className="text-xs text-gray-600 leading-4"> - Level 1 chargers use the same standard 120 V outlets,<br></br> - Can add up to 5 miles of range per hour of charging</p>
                        </div>
                    )}
                    <div className="ml-1.5 cursor-pointer">
                        <InfoIcon/>
                    </div>
                </div>
            </div>
          </div>
          <div className="px-4 py-2 md:p-4">
            <div className="flex items-center">
              <h2 className="text-sm md:text-lg font-semibold">{evStationName}</h2>    
              <p className="text-xs text-gray-600 pl-5">{rating} ⭐</p>
            </div>
            <p className="text-xs text-gray-600 mt-1 md:mt-2">
                {evStationAddress}
            </p>
            <div className="flex mt-2 md:mt-4">
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
            <div className="flex items-center justify-between py-4">
              <h2 className="text-indigo-700 text-xs font-semibold">
              {city} {state}, {country}
              </h2>
              <h3 className="text-indigo-700 text-sm md:text-xl font-semibold">150₹/hr</h3>
            </div>
          </div>
        </div>
      </div>
  );
}

export default EvCard;
