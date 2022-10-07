import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import {
  CompanyEditUserPayloadProps,
  CompanyGroupIndividualPayloadProps,
  CompanyNewUserPayloadProps,
  CompanyUserDeletePayloadProps,
  CompanyUserPayloadProps
} from 'services/request/models/payload';
import {
  ClientGroupListResponseProps,
  CompanyIndividualResponseProps,
  CompanyNewUserResponseProps,
  ClientPermissionsResponseProps,
  CompanyUserEditResponseProps,
  CompanyUserRemoveResponseProps,
  CompanyUsersListResponseProps,
  ClientUsersResponseProps
} from 'services/request/models/response';

export const fetchPermissions = createAsyncThunk<ClientPermissionsResponseProps[], any>(
  'client.getPermissions',
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.client.permissions,
        method: 'GET',
        data
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchGroups = createAsyncThunk<ClientGroupListResponseProps[]>(
  'client.getGroups',
  async (__, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.client.groups,
        method: 'GET'
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchGroup = createAsyncThunk<
  CompanyIndividualResponseProps[],
  CompanyGroupIndividualPayloadProps
>('integrator.getGroup', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.group}/${data.id}`,
      method: 'GET',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchUsers = createAsyncThunk<ClientUsersResponseProps[]>(
  'client.getUsers',
  async (__, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: process.env.REACT_APP_BASE_URL + endpoints.client.users,
        method: 'GET'
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchUser = createAsyncThunk<CompanyUsersListResponseProps, CompanyUserPayloadProps>(
  'integrator.getUser',
  async (data, { rejectWithValue }) => {
    try {
      const api = axiosInstance;
      const response = await api({
        baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.user}/${data.id}`,
        method: 'GET',
        data
      });

      return response.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const fetchNewUser = createAsyncThunk<
  CompanyNewUserResponseProps,
  CompanyNewUserPayloadProps
>('integrator.NewUser', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.user}`,
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchEditUser = createAsyncThunk<
  CompanyUserEditResponseProps,
  CompanyEditUserPayloadProps
>('integrator.EditUser', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.user}/${data.id}`,
      method: 'PUT',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchRemoveUser = createAsyncThunk<
  CompanyUserRemoveResponseProps,
  CompanyUserDeletePayloadProps
>('integrator.EditUser', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.user}/${data.id}`,
      method: 'DELETE',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});

export const fetchChangeStatusUser = createAsyncThunk<
  CompanyUserRemoveResponseProps,
  CompanyUserDeletePayloadProps
>('integrator.EditUser', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response = await api({
      baseURL: `${process.env.REACT_APP_BASE_URL + endpoints.integrator.user}/${data.id}`,
      method: 'DELETE',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
