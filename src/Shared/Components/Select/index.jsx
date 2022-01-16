import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import {
  getAreaApi,
  getCityApi,
  getStateApi,
  getListItemsApi,
} from "Services/Service.js";
import { Main } from "./style";
import { Button } from "Pages/Home/Home";
import EvCard from "Components/EvCard/EvCard.";
import { useNavigate } from "react-router-dom";

export default function SelectComponent() {
  const navigate = useNavigate();
  const [evStations, setEvStations] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState({
    stateLoading: true,
    cityLoading: true,
    areaLoading: true,
  });
  const [selectedValue, setSelectedValue] = useState({
    stateValue: null,
    cityValue: null,
    areaValue: null,
  });
  const { areaValue, stateValue, cityValue } = selectedValue;
  const handleInputChange = (name, value, option) => {
    switch (name) {
      case "state":
        setSelectedValue({
          ...selectedValue,
          stateValue: option,
          cityValue: null,
          areaValue: null,
        });
        setIsLoading({ ...isLoading, cityLoading: true });
        setCities([]);
        Promise.resolve(getCityApi(option["key"])).then(({ data }) => {
          const refinedCities = data.response.cities.map((city) => {
            return {
              key: city.city_id,
              value: city.city_name,
              label: city.city_name,
              state_id: city.state_id,
            };
          });
          setCities(refinedCities);
          setAreaOptions([]);
          setIsLoading({ ...isLoading, cityLoading: false });
        });
        break;
      case "city":
        setSelectedValue({
          ...selectedValue,
          cityValue: option,
          areaValue: null,
        });
        setAreaOptions([]);
        setIsLoading({ ...isLoading, areaLoading: true });
        Promise.resolve(getAreaApi(option["state_id"], option["key"])).then(
          ({ data }) => {
            const refinedArea = data.response?.areas.map((area) => {
              return {
                key: area.area_id,
                value: area.area_name,
                label: area.area_name,
              };
            });
            setAreaOptions(refinedArea);
            setIsLoading({ ...isLoading, areaLoading: false });
          }
        );
        break;
      case "area":
        setSelectedValue({ ...selectedValue, areaValue: option });
        break;
      default:
    }
  };

  const handleSearch = () => {
    if (areaValue && cityValue && stateValue) {
      setShowLoader(true);
      Promise.resolve(
        getListItemsApi(stateValue.value, cityValue.value, areaValue.value)
      ).then(({ data }) => {
        setShowLoader(false);
        console.log(data, "List item is here");
        setEvStations(JSON.parse(JSON.stringify(data?.response)));
      });
    }
  };

  useEffect(() => {
    const data = getStateApi();
    Promise.resolve(data).then((data) => {
      const refinedStates = data.data.response.states.map((item) => {
        return {
          label: item.state_name,
          key: item.state_id,
          value: item.state_name,
        };
      });
      setStates(refinedStates);
      setIsLoading({ ...isLoading, stateLoading: false });
    });
  }, []);

  const handelRoute = (index, station) => {
    navigate(`/detail/${index}`, { state: { index, station } });
  };

  return (
    <div>
      <Main>
        <Select
          title="state"
          showSearch
          placeholder="Search your state"
          onChange={(value, option) =>
            handleInputChange("state", value, option)
          }
          options={states}
          notFoundContent={
            isLoading.stateLoading ? <Spin size="small" /> : null
          }
          value={stateValue}
        />
        <Select
          title="city"
          disabled={!stateValue}
          showSearch
          placeholder="Search your city"
          onChange={(value, option) => handleInputChange("city", value, option)}
          options={cities}
          notFoundContent={isLoading.cityLoading ? <Spin size="small" /> : null}
          value={cityValue}
        />
        <Select
          title="area"
          disabled={!cityValue}
          showSearch
          placeholder="Search area"
          onChange={(value, option) => handleInputChange("area", value, option)}
          options={areaOptions}
          notFoundContent={isLoading.areaLoading ? <Spin size="small" /> : null}
          value={areaValue}
        />
        <Button
          disabled={!areaValue}
          className="select-search-btn"
          onClick={handleSearch}
        >
          Search
        </Button>
      </Main>
      <div className="md:px-16">
        {showLoader ? (
         <div className="h-96 w-full flex justify-center items-center">
          <Spin size="large" />
        </div>
        ) : (
          <div className="flex rounded-xl flex-wrap py-4 md:pt-0 md:py-4 my-8 gap-4">
            {evStations.length > 0 &&
              evStations.map((station, index) => {
                return (
                  <EvCard
                    index={index}
                    onClick={() => handelRoute(index, station)}
                    station={station}
                    key={index + "station"}
                  />
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}
