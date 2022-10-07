import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from 'services/request/baseQuery';
import { LoginPayloadProps } from 'services/request/models/payload';
import { LoginResponseProps } from 'services/request/models/response';

export const AuthAdminRTK = createApi({
  reducerPath: 'authadmin',
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    fetchLogin: builder.mutation<LoginResponseProps, LoginPayloadProps>({
      query: (data) => ({
        url: 'loginAdmin',
        method: 'POST',
        data
      })
    })
  })
});

export const { useFetchLoginMutation } = AuthAdminRTK;
