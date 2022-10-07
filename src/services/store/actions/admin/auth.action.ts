import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { axiosInstance } from 'services/instance';
import endpoints from 'services/request/endpoints';
import { AdministrativeRecoveryPayloadProps } from 'services/request/models/payload';
import { AdministrativeRecoveryResponseProps } from 'services/request/models/response';

export const fetchAdministrativeRecovery = createAsyncThunk<
  AdministrativeRecoveryResponseProps,
  AdministrativeRecoveryPayloadProps
>('authentication.admin.fetchAdministrativeRecovery', async (data, { rejectWithValue }) => {
  try {
    const api = axiosInstance;
    const response: AxiosResponse = await api({
      baseURL: process.env.REACT_APP_BASE_URL + endpoints.administrative.recovery,
      method: 'POST',
      data
    });

    return response.data;
  } catch (err) {
    return rejectWithValue(err);
  }
});
