import axios from "axios";

const BASE_URL = "";

export const LoginApi = (request) => {
  // const { email, password } = request;
  const url = "BASE_URL";
  return axios.get(url);
};

export const getStateApi = async () => {
  const url = `${BASE_URL}/v1/evslocator/state`;
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const getCityApi = async (id) => {
  const url = `${BASE_URL}/v1/evslocator/state/${id}/city`;
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const getAreaApi = async (stateid, cityid) => {
  const url = `${BASE_URL}/v1/evslocator/state/${stateid}/city/${cityid}/area`;
  try {
    const resp = await axios.get(url);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};
export const getListItemsApi = async (stateid, cityid, areaid) => {
  const url = `${BASE_URL}/v1/evslocator/evs/info/`;
  const body = {
    state_id: stateid,
    city_id: cityid,
    area_code: areaid,
  };
  try {
    const resp = await axios.post(url, body);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const getItemApi = async (id) => {
  const url = `${BASE_URL}/v1/evslocator/evs/info/${id}`;
  try {
    const resp = await axios.post(url);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const getItemSlotsApi = async (stationId, date) => {
  const url = `${BASE_URL}/v1/evslocator/evs/slot/schedule`;
  const body = {
    evStationId: stationId.toString(),
    date: date,
  };
  try {
    const resp = await axios.get(url, {
      params: body,
    });
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};

export const postBookingSlot = async (customerId, evsSlotId, date) => {
  const url = `${BASE_URL}/v1/evslocator/evs/slot/schedule`;
  const body = {
    customerId: customerId,
    evsSlotId: evsSlotId,
    date: date,
  };
  try {
    const resp = await axios.post(url, body);
    return resp.data;
  } catch (err) {
    console.error(err);
  }
};
