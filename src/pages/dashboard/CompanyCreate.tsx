import { useEffect, useState } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import axios from 'axios';
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getCompanyList } from '../../redux/slices/company';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { CompanyNewForm } from '../../components/_dashboard/companies';

// ----------------------------------------------------------------------

export default function CompanyCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentCompany = companyList.find((company) => paramCase(company.name) === name);

  const [currentCnpj, setCurrentCnpj] = useState('');
  const [remoteLoading, setRemoteLoading] = useState(false);
  const [remoteCompany, setRemoteCompany] = useState(null);

  async function consultCnpj(cnpj: string) {
    const endpoint = `https://publica.cnpj.ws/cnpj/${cnpj}`;
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

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page title={!isEdit ? 'Cadastros: Cadastrar nova empresa' : 'Cadastros: Editar empresa'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar nova empresa' : 'Editar Empresa'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Empresa', href: PATH_DASHBOARD.registers.companies },
            { name: !isEdit ? 'Nova empresa' : name }
          ]}
        />

        <CompanyNewForm
          isEdit={isEdit}
          currentCompany={currentCompany}
          dataCnpj={{ set: setCurrentCnpj }}
          autocomplete={remoteCompany}
          loading={remoteLoading}
        />
      </Container>
    </Page>
  );
}
