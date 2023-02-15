import { createSlice, Reducer } from '@reduxjs/toolkit';
import {
  fetchGroups,
  fetchPermissions,
  fetchUsers
} from 'services/store/actions/integrator/user.action';
import { UserStateProps } from 'services/store/models/integrator';

const initialState: UserStateProps = {
  permissionsLoading: false,
  groups: [],
  groupsLoading: false,
  users: [],
  usersLoading: false
};

const usersIntegratorSlice = createSlice({
  name: 'UsersIntegrator',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.permissionsLoading = true;
      })
      .addCase(fetchPermissions.rejected, (state) => {
        state.permissionsLoading = false;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.permissionsLoading = false;
      })
      .addCase(fetchGroups.pending, (state) => {
        state.groupsLoading = true;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupsLoading = false;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groupsLoading = false;
        state.groups = action.payload;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.usersLoading = true;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersLoading = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      });
  }
});

export default usersIntegratorSlice.reducer as Reducer<typeof initialState>;
