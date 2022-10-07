import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/request/baseQuery';
import endpoints from 'services/request/endpoints';
import { GetCompanyPayloadProps } from 'services/request/models/payload';
import { CompaniesListResponseProps } from 'services/request/models/response';

export const CompaniesRTK = createApi({
  reducerPath: 'companies',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getCompaniesList: builder.query<CompaniesListResponseProps[], null>({
      query: () => ({
        url: `${endpoints.administrative.companiesList}`,
        method: 'GET'
      })
    }),
    getCompany: builder.mutation<CompaniesListResponseProps, GetCompanyPayloadProps>({
      query: (data) => ({
        url: `${endpoints.administrative.company}/${data.id}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetCompaniesListQuery, useGetCompanyMutation } = CompaniesRTK;
