import React, { useEffect, useState } from "react";
import { Select, Spin } from "antd";
import { Main} from "./style";
import { getAreaApi, getCityApi, getStateApi } from "Services/Service.js";
import { Button } from "Pages/Home/Home";
import EvCard from "Components/EvCard/EvCard.";
import { useNavigate } from "react-router-dom";

export default function SelectComponent() {
  const navigate = useNavigate()
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
    // call list item api function here
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

  const handelRoute=(index)=>{
    navigate(`/detail/${index}`,{ state: index })
  }

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
          showSearch
          placeholder="Search your city"
          onChange={(value, option) => handleInputChange("city", value, option)}
          options={cities}
          notFoundContent={isLoading.cityLoading ? <Spin size="small" /> : null}
          value={cityValue}
        />
        <Select
          title="area"
          showSearch
          placeholder="Search area"
          onChange={(value, option) => handleInputChange("area", value, option)}
          options={areaOptions}
          notFoundContent={isLoading.areaLoading ? <Spin size="small" /> : null}
          value={areaValue}
        />
        <Button className="select-search-btn" onClick={handleSearch}>
          Search
        </Button>
      </Main>
      <div className="md:px-16">
        <div className="flex rounded-xl flex-wrap py-4 md:pt-0 md:py-4 my-8 gap-4">
          <EvCard index={1} onClick={()=>handelRoute(1)}/>
          <EvCard index={2} onClick={()=>handelRoute(2)}/>
          <EvCard index={3} onClick={()=>handelRoute(3)}/>
          <EvCard index={4} onClick={()=>handelRoute(4)}/>
        </div>
      </div>
    </div>
  );
}
