import View from "./view";
import { axiosInstance } from "services/instance";
import { useEffect, useState } from "react";
import { MediaTypeProps, ProductProps } from "./model/index";

const Home: React.FC = () => {
  const [productList, setProductList] = useState<ProductProps[]>([]);
  const [mediaTypeList, setMediaTypeList] = useState<MediaTypeProps[]>([]);

  async function getCertTypes() {
    const qs = require("qs");
    const endpoint = "CertType/";
    const payload = qs.stringify({
      apiKey: "12567wfrdf47c2843ddb7a9e20d4ew2",
    });
    await axiosInstance
      .post(endpoint, payload)
      .then((response) => {
        setProductList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  async function getMediaTypes() {
    const qs = require("qs");
    const endpoint = "MidiaType";
    const payload = qs.stringify({
      apiKey: "12567wfrdf47c2843ddb7a9e20d4ew2",
    });
    await axiosInstance
      .post(endpoint, payload)
      .then((response) => {
        setMediaTypeList(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(() => {
    // getCertTypes();
    // getMediaTypes();
  }, []);

  useEffect(() => {

  }, [mediaTypeList]);

  return <View />;
};

export default Home;
