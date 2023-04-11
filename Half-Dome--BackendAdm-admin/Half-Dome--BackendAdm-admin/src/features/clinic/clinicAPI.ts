import { ellacoreApi, endpoints } from "../../app/services";

export interface ApiStandardResponse {
  statusCode: number;
  message: string;
}

export interface AddClinicRequest {
  Address: string;
  email: string;
  name: string;
  phoneNumber: string;
  zipcode: string;
}
export interface AddClinicResponse {
  statusCode: number;
  message: string;
}

export const clinicApi = ellacoreApi.injectEndpoints({
  endpoints: (builder) => ({
    getClinics: builder.query({
      query: () => endpoints.CLINIC,
      providesTags:["ClinicProfile"]
    }),
    addClinic: builder.mutation({
      query: (clinicDetails) => ({
        url: endpoints.CLINIC,
        method: "POST",
        body: clinicDetails,
      }),
    }),
    updateClinic: builder.mutation({
      query: ({email,...clinicDetails}) => ({
        url: `${endpoints.CLINIC}/${email}`,
        method: "PUT",
        body: clinicDetails,
        // invalidatesTags: () => ["ClinicProfile"],
      }),
    }),
    deleteClinic: builder.mutation({
      query: (email) => ({
        url: `${endpoints.CLINIC}/${email}`,
        method: "DELETE"
        // body: clinicDetails,
        // invalidatesTags: () => ["ClinicProfile"],
      }),
    }),
  }),
});

export const { useAddClinicMutation, useGetClinicsQuery, useUpdateClinicMutation, useDeleteClinicMutation } = clinicApi;
