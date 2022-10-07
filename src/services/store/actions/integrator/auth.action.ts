import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import { LoginCompanyPayloadProps } from 'services/request/models/payload';
import { LoginCompanyResponseProps } from 'services/request/models/response';

export const fetchLogin = createAsyncThunk<LoginCompanyResponseProps, LoginCompanyPayloadProps>(
  'authentication.company.fetchLogin',
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const signInResponse = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.login,
        method: 'POST',
        data
      });

      return signInResponse.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const Logout = createAction('authentication.company.logout');
