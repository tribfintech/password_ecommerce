import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import {
  ProfileChangePasswordPayloadProps,
  ProfileEditPayloadProps
} from 'services/request/models/payload';
import {
  ProfileChangePasswordResponseProps,
  ProfileIntegratorResponseProps
} from 'services/request/models/response';

export const fetchProfile = createAsyncThunk<ProfileIntegratorResponseProps>(
  'integrator.getProfile',
  async (__, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.profile,
        method: 'GET'
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchEditProfile = async (data: ProfileEditPayloadProps) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.changeDetails,
      method: 'PUT',
      data
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const fetchChangePassword = async (
  data: ProfileChangePasswordPayloadProps
): Promise<AxiosResponse<ProfileChangePasswordResponseProps> | AxiosError<{ error: string }>> => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.changePassword,
      method: 'PUT',
      data
    });

    return response as
      | AxiosResponse<ProfileChangePasswordResponseProps>
      | AxiosError<{ error: string }>;
  } catch (err) {
    return err as AxiosError<{ error: string }>;
  }
};
