import { createSlice } from "@reduxjs/toolkit";
import { CertificateProps } from "screens/home/model";
import { stateRegistration } from "utils/mock-data/dataCompany";

export interface ReducerCheckoutProps {
  type: string;
  payload: {
    product: string;
    model: string;
    media: string;
    validity: string;
    emission: string;
  };
}

export const slice = createSlice({
  name: "checkout",
  initialState: {
    product: "",
    model: "",
    media: "",
    validity: "",
    emission: "",
  },
  reducers: {
    makeCheckout(state, { payload }: ReducerCheckoutProps) {
      state = payload
      return state
    },
  },
});

export const { makeCheckout } = slice.actions;

export const selectCheckout = (state: any) => state;

export default slice.reducer;
