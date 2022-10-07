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
import { GatekeeperNewForm } from '../../components/_dashboard/gatekeeper';

// ----------------------------------------------------------------------

export default function GatekeeperCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentGatekeeper = companyList.find((gatekeeper) => paramCase(gatekeeper.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page
      title={
        !isEdit
          ? 'Substituto Tributário: Cadastrar nova Portária'
          : 'Substituto Tributário: Editar Portária'
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar nova Portária' : 'Editar Portária'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Portária 195', href: PATH_DASHBOARD.taxSubstitute.gatekeeper },
            { name: !isEdit ? 'Nova Portária' : name }
          ]}
        />

        <GatekeeperNewForm isEdit={isEdit} currentGatekeeper={currentGatekeeper} />
      </Container>
    </Page>
  );
}
