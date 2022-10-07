import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import { LoginClientPayloadProps } from 'services/request/models/payload';
import { LoginClientResponseProps } from 'services/request/models/response';

export const fetchLoginClient = createAsyncThunk<LoginClientResponseProps, LoginClientPayloadProps>(
  'authentication.client.fetchLogin',
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const signInResponse = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.client.login,
        method: 'POST',
        data
      });

      return signInResponse.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const LogoutClient = createAction('authentication.client.logout');
