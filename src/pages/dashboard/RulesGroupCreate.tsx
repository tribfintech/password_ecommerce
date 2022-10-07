import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector, RootState } from '../../redux/store';
import { getCompanyList } from '../../redux/slices/company'; // Mudar
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import RulesGroupNewForm from '../../components/_dashboard/rules-group/RulesGroupNewForm';

// ----------------------------------------------------------------------

export default function RulesGroupCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentRulesGroup = companyList.find((rulesGroup) => paramCase(rulesGroup.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page
      title={
        !isEdit ? 'Cadastros: Cadastrar Novo Grupo de Regras' : 'Cadastros: Editar Grupo de Regras'
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar novo Grupo de Regras' : 'Editar Grupo de Regras'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Grupo de Regras', href: PATH_DASHBOARD.registers.rulesGroup },
            { name: !isEdit ? 'Novo Grupo de Regras' : name }
          ]}
        />

        <RulesGroupNewForm isEdit={isEdit} currentRulesGroup={currentRulesGroup} />
      </Container>
    </Page>
  );
}
