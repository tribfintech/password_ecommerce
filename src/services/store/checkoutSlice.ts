import { createSlice } from "@reduxjs/toolkit";
import { CheckoutSelectorProps } from "screens/checkout/model";
import { CertificateProps } from "screens/home/model";

export interface ReducerCheckoutProps {
  type: string;
  payload: CertificateProps;
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
      console.log("reducer payload", payload);
      state = payload;
      console.log("state payload", state);

      return state;
    },
  },
});

export const { makeCheckout } = slice.actions;

export const selectCheckout = (state: any) =>
  state.checkout as CertificateProps;

export default slice.reducer;
