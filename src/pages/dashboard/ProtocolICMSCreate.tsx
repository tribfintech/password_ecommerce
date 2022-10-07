import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getCompanyList } from '../../redux/slices/company';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProtocolNewForm } from '../../components/_dashboard/protocol';

// ----------------------------------------------------------------------

export default function ProtocolCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentProtocol = companyList.find((protocol) => paramCase(protocol.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page title={!isEdit ? 'Cadastros: Cadastrar novo protocolo' : 'Cadastros: Editar protocolo'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar novo Protocolo' : 'Editar Protocolo'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Protocolo 41/2008 ', href: PATH_DASHBOARD.taxBase.protocolICMS },
            { name: !isEdit ? 'Novo protocolo' : name }
          ]}
        />

        <ProtocolNewForm isEdit={isEdit} currentProtocol={currentProtocol} />
      </Container>
    </Page>
  );
}
