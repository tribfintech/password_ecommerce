import axios from 'axios';
import { useEffect, useState } from 'react';
import { PATH_APP } from 'routes/paths';
import View from './View';

const Register = () => {
  const [currentCnpj, setCurrentCnpj] = useState('');
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [remoteCompany, setRemoteCompany] = useState(null);

  async function consultCnpj(cnpj: string) {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${PATH_APP.company.consult}/${cnpj}`;
    setRemoteLoading(true);

    try {
      const { data } = await axios.get(endpoint);
      setRemoteCompany(data);
      setRemoteLoading(false);
    } catch (error) {
      console.log('Error', error);
      setRemoteLoading(false);
    }
  }

  useEffect(() => {
    const cnpjValidate = currentCnpj.replace(/\D/g, '');
    if (cnpjValidate.length >= 14) {
      consultCnpj(cnpjValidate);
    }
  }, [currentCnpj]);

  return (
    <View
      dataCnpj={{ set: setCurrentCnpj }}
      dataAutocomplete={remoteCompany}
      loading={remoteLoading}
      consultCnpj={consultCnpj}
    />
  );
};

export default Register;
