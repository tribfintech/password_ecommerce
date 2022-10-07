import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import {
  adminCompanyCreatePayloadProps,
  companyCreatePayloadProps,
  UpdateCompanyPayloadProps
} from 'services/request/models/payload';
import {
  AdminCompanyCreateResponseProps,
  LoginResponseProps
} from 'services/request/models/response';

export const fetchCreateCompany = createAsyncThunk<
  AdminCompanyCreateResponseProps,
  companyCreatePayloadProps
>('unauthenticated.company.create', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.registerCompany,
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchCreateCompanyAdmin = createAsyncThunk<
  AdminCompanyCreateResponseProps,
  adminCompanyCreatePayloadProps
>('administrative.company.create', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.administrative.registerCompany,
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const UpdateCompany = createAsyncThunk<LoginResponseProps, UpdateCompanyPayloadProps>(
  'authenticad.company.update',
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.administrative.company}/${data.id}`,
        method: 'PUT',
        data
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
