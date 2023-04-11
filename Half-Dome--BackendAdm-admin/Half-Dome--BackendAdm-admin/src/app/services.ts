import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";


const baseUrl = "http://3.1.204.10:5000";
export const baseQuery = fetchBaseQuery({ baseUrl,
  prepareHeaders: (headers, { getState }) => {
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    // Access-Control-Allow-Origin’:’*’
    headers.set("Access-Control-Allow-Origin", "*")
    return headers;
  },
});
export const ellacoreApi = createApi({
  baseQuery,
  tagTypes: ["ClinicProfile","PhysicianProfile"],
  endpoints: () => ({}),
});
const endpointsUrl = {
  LOGIN: "emailvalidation",
  LOGOUT: "logout",
  PATIENTS: "patients",
  PHYSICIAN: "physician",
  CLINIC: "clinic",
  DASHBOARD_DETAILS: "dashboarddetails",
  // DOCTORS:"doctors"
} as const;

type EndpointsType = typeof endpointsUrl;
type EndpointsKeys = keyof EndpointsType;
// type EndpointValues = EndpointsType[EndpointsKeys];
export const endpoints = Object.entries(endpointsUrl).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [key]: `${baseUrl}/${val}`,
  }),
  {}
) as { [k in EndpointsKeys]: string };
