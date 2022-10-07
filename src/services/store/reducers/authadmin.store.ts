import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchLoginAdmin, LogoutAdmin } from '../actions/auth.action';
import { AuthAdminProps } from '../models';

const initialState: AuthAdminProps = {
  signed: false,
  loading: false,
  token: {
    value: '',
    expires: ''
  },
  user: {
    celular: '',
    cpf: '',
    created_at: '',
    data_nascimento: '',
    email: '',
    nome: '',
    updated_at: '',
    id: 0
  }
};

const authAdminSlice = createSlice({
  name: 'AuthAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoginAdmin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLoginAdmin.rejected, (state) => {
        state.loading = false;
        state.signed = false;
      })
      .addCase(fetchLoginAdmin.fulfilled, (state, action) => {
        state.signed = true;
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(LogoutAdmin, (state) => {
        state.signed = false;
      });
  }
});

export default authAdminSlice.reducer as Reducer<typeof initialState>;
