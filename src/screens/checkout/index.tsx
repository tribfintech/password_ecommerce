import useSettings from "hooks/useSettings";
import View from "./view";
import { useSelector } from "react-redux";
import { selectCheckout } from "services/store/checkoutSlice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import axiosInstance from "utils/axios";
import { endpoints } from "services/requests/endpoints";

type StepsType = string[];

const steps: StepsType = [
  "Carrinho",
  "Consulta Prévia",
  "Identificação",
  "Nota Fiscal",
  "Pagamento",
  "Conclusão",
];

const Checkout: React.FC = () => {
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const checkout = useSelector(selectCheckout);

  useEffect(() => {
    // !checkout.emission && navigate("/home");
  }, []);

  return (
    <View
      {...{
        themeStretch,
        steps,
        checkout,
      }}
    />
  );
};

export default Checkout;
