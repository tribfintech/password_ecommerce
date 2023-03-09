import { makeCheckout } from "services/store/checkoutSlice";
import View from "./view";
import { useDispatch } from "react-redux";
import { CertificateProps } from "screens/home/model";
import { useNavigate } from "react-router";
import { PATH_PAGE } from './../../routes/paths';

const Home: React.FC = () => {
  const a1MediaOption = ["Arquivo"];
  const a3MediaOptions = ["Token", "Cartão", "Safe-ID", "Sem mídia"];

  const defaultValidities = ["1 Ano", "2 Anos", "3 Anos"];
  const safeIdValidities = ["4 Meses", "1 Ano", "2 Anos", "3 Anos"];

  const dispatch = useDispatch();
  const navigate = useNavigate();

const steps = ['Carrinho', 'Pagamento'];

  const handleCheckout = (values: CertificateProps) => {
    dispatch(makeCheckout(values));
    navigate(PATH_PAGE.checkout)
  };

  return (
    <View
      {...{
        // root
        a1MediaOption,
        a3MediaOptions,
        defaultValidities,
        safeIdValidities,
        handleCheckout,

        // product

        // stepper
        steps
      }}
    />
  );
};

export default Home;
