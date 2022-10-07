import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/request/baseQuery';
import endpoints from 'services/request/endpoints';
import { GetCompanyPayloadProps } from 'services/request/models/payload';
import { CompaniesListResponseProps } from 'services/request/models/response';

export const UsersAdminRTK = createApi({
  reducerPath: 'usersAdmin',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getUsersAdminList: builder.query<any[], null>({
      query: () => ({
        url: `${endpoints.administrative.groups}`,
        method: 'GET'
      })
    })
  })
});

export const { useGetUsersAdminListQuery } = UsersAdminRTK;
