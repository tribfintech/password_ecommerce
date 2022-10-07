import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import {
  adminCompanyCreatePayloadProps,
  CompanyCreateClientPayloadProps,
  CompanyRemoveClientPayloadProps,
  CompanyUpdateClientPayloadProps,
  UpdateCompanyPayloadProps
} from 'services/request/models/payload';
import {
  CompanyClientsResponseProps,
  CompanyCreateClientResponseProps
} from 'services/request/models/response';

export const fetchClients = createAsyncThunk<CompanyClientsResponseProps[]>(
  'integrator.getClients',
  async (__, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.clients,
        method: 'GET'
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchCreateClient = createAsyncThunk<
  CompanyCreateClientResponseProps,
  CompanyCreateClientPayloadProps
>('integrator.createClient', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.integrator.client,
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchUpdateClient = createAsyncThunk<
  CompanyCreateClientResponseProps,
  UpdateCompanyPayloadProps
>('integrator.updateClient', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.client}/${data.id}`,
      method: 'PUT',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchDeleteClient = createAsyncThunk<
  CompanyRemoveClientPayloadProps,
  CompanyRemoveClientPayloadProps
>('integrator.removeClient', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.clients}/${data.id}`,
      method: 'DELETE',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
