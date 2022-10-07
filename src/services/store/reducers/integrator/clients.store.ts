import { createSlice, Reducer } from '@reduxjs/toolkit';
import { fetchClients } from 'services/store/actions/integrator/clients.action';
import { CompanyClientsStateProps } from 'services/store/models/integrator';

const initialState: CompanyClientsStateProps = {
  loading: false,
  clients: []
};

const clientsIntegratorSlice = createSlice({
  name: 'UsersIntegrator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      });
  }
});

export default clientsIntegratorSlice.reducer as Reducer<typeof initialState>;
