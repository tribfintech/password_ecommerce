import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchProfile } from 'services/store/actions/integrator/profile.action';
import { ProfileIntegratorStateProps } from 'services/store/models/integrator';

const initialState: ProfileIntegratorStateProps = {
  id: 0,
  nome: '',
  celular: '',
  email: '',
  cpf: '',
  loading: false
};

const profileIntegratorSlice = createSlice({
  name: 'ProfileIntegrator',
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

export default profileIntegratorSlice.reducer as Reducer<typeof initialState>;
