import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchLogin, Logout } from '../actions/authcompany.action';
import { AuthCompanyProps } from '../models';

const initialState: AuthCompanyProps = {
  signed: false,
  loading: false,
  token: {
    value: '',
    expires: ''
  },
  user: {
    celular: '',
    cpf: '',
    email: '',
    nome: '',
    id: 0,
    ativo: false
  },
  permissions: ''
};

const authCompanySlice = createSlice({
  name: 'AuthCompany',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLogin.rejected, (state) => {
        state.loading = false;
        state.signed = false;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.signed = true;
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
      })
      .addCase(Logout, (state) => {
        state.signed = false;
      });
  }
});

export default authCompanySlice.reducer as Reducer<typeof initialState>;
