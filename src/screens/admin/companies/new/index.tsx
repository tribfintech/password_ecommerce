import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { PATH_ADMIN, PATH_APP } from 'routes/paths';
import { useParams } from 'react-router-dom';
import { useGetCompanyMutation } from 'services/rtk/companies.rtk';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import View from './View';
import { CompanyManager } from './Model';

const Company: React.FC = () => {
  const params = useParams();

  const [typePage, setTypePage] = useState<'New' | 'Edit'>('New');

  const [currentCnpj, setCurrentCnpj] = useState('');
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [remoteCompany, setRemoteCompany] = useState(null);

  const [getCompanyRequest] = useGetCompanyMutation();

  async function callEdit() {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.administrative.company}/${params.id}`;
    setRemoteLoading(true);

    try {
      const { data } = await axiosInstance.get(endpoint);
      await setRemoteCompany(data);
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
      setRemoteCompany(data);
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
      dataAutocomplete={remoteCompany}
      loading={remoteLoading}
      consultCnpj={consultCnpj}
      typePage={typePage}
    />
  );
};
export default Company;
