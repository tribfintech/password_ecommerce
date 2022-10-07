import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { ImporterType } from '../../@types/importer';
import { store } from '../store';

type ImporterState = {
  isLoading: boolean;
  error: boolean;
  importerList: ImporterType[];
};

const initialState: ImporterState = {
  isLoading: false,
  error: false,
  importerList: []
};

const slice = createSlice({
  name: 'importer',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET IMPORTATION
    getImporterSuccess(state, action) {
      state.isLoading = false;
      state.importerList = action.payload;
    },

    // DELETE importerS
    deleteImporter(state, action) {
      const deleteImporter = state.importerList.filter(
        (importer) => importer.id !== action.payload
      );
      state.importerList = deleteImporter;
    }
  }
});

// reducer
export default slice.reducer;

export function getImporterList() {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      const response: { data: { importers: ImporterType[] } } = await axios.get('/api/importers');
      console.log(response);
      dispatch(slice.actions.getImporterSuccess(response.data.importers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setImporterState(importers: ImporterType[]) {
  return async () => {
    const { dispatch } = store;
    dispatch(slice.actions.startLoading());
    try {
      console.log(`dispathing importers`, importers);

      dispatch(slice.actions.getImporterSuccess(importers));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
