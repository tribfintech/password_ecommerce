import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchProfile } from 'services/store/actions/admin/profile.action';
import { ProfileAdminStateProps } from 'services/store/models/admin';

const initialState: ProfileAdminStateProps = {
  id: 0,
  nome: '',
  celular: '',
  email: '',
  cpf: '',
  loading: false
};

const profileAdminSlice = createSlice({
  name: 'ProfileAdmin',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProfile.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.nome = action.payload.nome;
        state.celular = action.payload.celular;
        state.email = action.payload.email;
        state.cpf = action.payload.cpf;
        state.loading = false;
      });
  }
});

export default profileAdminSlice.reducer as Reducer<typeof initialState>;
