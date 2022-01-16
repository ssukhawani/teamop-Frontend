import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { Main, SearchBtn } from "./style";
import {
  getAreaApi,
  getCityApi,
  getStateApi,
  getListItemsApi,
} from "Services/Service.js";

export default function SelectComponent() {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
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
      Promise.resolve(
        getListItemsApi(stateValue.value, cityValue.value, areaValue.value)
      ).then(({ data }) => {
        console.log(data, "List item is here");
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

  return (
    <Main>
      <Select
        title="state"
        showSearch
        placeholder="Search your state"
        onChange={(value, option) => handleInputChange("state", value, option)}
        options={states}
        notFoundContent={isLoading.stateLoading ? <Spin size="small" /> : null}
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
      <SearchBtn
        disabled={!areaValue}
        className="select-search-btn"
        onClick={handleSearch}
      >
        Search
      </SearchBtn>
    </Main>
  );
}
