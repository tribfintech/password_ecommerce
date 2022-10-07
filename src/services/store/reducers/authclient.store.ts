import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchLoginClient, LogoutClient } from '../actions/authclient.action';
import { fetchLogin, Logout } from '../actions/authcompany.action';
import { AuthClientProps } from '../models';

const initialState: AuthClientProps = {
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

const authClientSlice = createSlice({
  name: 'AuthClient',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginClient.rejected, (state) => {
        state.loading = false;
        state.signed = false;
      })
      .addCase(fetchLoginClient.fulfilled, (state, action) => {
        state.signed = true;
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.permissions = action.payload.permissions;
      })
      .addCase(LogoutClient, (state) => {
        state.signed = false;
      });
  }
});

export default authClientSlice.reducer as Reducer<typeof initialState>;
