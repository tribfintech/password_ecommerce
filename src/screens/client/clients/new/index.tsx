import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PATH_ADMIN, PATH_APP } from 'routes/paths';
import { useParams } from 'react-router-dom';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import View from './View';

const CompanyNewClient: React.FC = () => {
  const params = useParams();

  const [typePage, setTypePage] = useState<'New' | 'Edit'>('New');

  const [currentCnpj, setCurrentCnpj] = useState('');
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [remoteClient, setRemoteClient] = useState(null);

  async function callEdit() {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.integrator.clients}/${params.id}`;
    setRemoteLoading(true);

    try {
      const { data } = await axiosInstance.get(endpoint);
      await setRemoteClient(data);
      setRemoteLoading(false);
    } catch (error) {
      console.log('Error', error);
      setRemoteLoading(false);
    }
  }

  useEffect(() => {
    if (params.id) {
      setTypePage('Edit');
      callEdit();
    }
  }, []);

  async function consultCnpj(cnpj: string) {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${PATH_APP.company.consult}/${cnpj}`;
    setRemoteLoading(true);

    try {
      const { data } = await axios.get(endpoint);
      setRemoteClient(data);
      setRemoteLoading(false);
    } catch (error) {
      console.log('Error', error);
      setRemoteLoading(false);
    }
  }

  useEffect(() => {
    if (typePage === 'New' && currentCnpj) {
      const cnpjValidate = currentCnpj.replace(/\D/g, '');
      if (cnpjValidate.length >= 14) {
        consultCnpj(cnpjValidate);
      }
    }
  }, [currentCnpj]);

  return (
    <View
      dataCnpj={{ set: setCurrentCnpj }}
      dataAutocomplete={remoteClient}
      loading={remoteLoading}
      consultCnpj={consultCnpj}
      typePage={typePage}
    />
  );
};
export default CompanyNewClient;
