import { ellacoreApi, endpoints } from "../../app/services";


export const physicianApi = ellacoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getPhysicians: builder.query({
      query: () => endpoints.PHYSICIAN,
      providesTags:["PhysicianProfile"]
    }),
    addPhysician: builder.mutation({
      query: (clinicDetails) => ({
        url: endpoints.PHYSICIAN,
        method: "POST",
        body: clinicDetails,
      }),
    }),
    updatePhysician: builder.mutation({
      query: ({email,...clinicDetails}) => ({
        url: `${endpoints.PHYSICIAN}/${email}`,
        method: "PUT",
        body: clinicDetails,
      }),
    }),
    deletePhysician: builder.mutation({
      query: (email) => ({
        url: `${endpoints.PHYSICIAN}/${email}`,
        method: "DELETE"
      }),
    }),
  }),
});

export const { useAddPhysicianMutation, useGetPhysiciansQuery, useUpdatePhysicianMutation, useDeletePhysicianMutation } = physicianApi;
