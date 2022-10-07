import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import { LoginPayloadProps } from 'services/request/models/payload';
import { LoginResponseProps } from 'services/request/models/response';

export const fetchLoginAdmin = createAsyncThunk<LoginResponseProps, LoginPayloadProps>(
  'authentication.admin.fetchLogin',
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const signInResponse = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.administrative.login,
        method: 'POST',
        data
      });

      return signInResponse.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const LogoutAdmin = createAction('authentication.admin.logout');
