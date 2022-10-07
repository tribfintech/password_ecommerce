import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchProfile } from 'services/store/actions/client/profile.action';
import { ProfileClientStateProps } from 'services/store/models/client';

const initialState: ProfileClientStateProps = {
  id: 0,
  nome: '',
  celular: '',
  email: '',
  cpf: '',
  loading: false
};

const profileClientSlice = createSlice({
  name: 'ProfileClient',
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

export default profileClientSlice.reducer as Reducer<typeof initialState>;
