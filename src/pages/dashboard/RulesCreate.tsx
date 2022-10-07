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
import { RulesNewForm } from '../../components/_dashboard/rules';

// ----------------------------------------------------------------------

export default function RuleCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentRule = companyList.find((rule) => paramCase(rule.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page title={!isEdit ? 'Cadastros: Cadastrar Nova Regra' : 'Cadastros: Editar Regra'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar nova Regra' : 'Editar Regra'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Regras', href: PATH_DASHBOARD.registers.rules },
            { name: !isEdit ? 'Nova Regra' : name }
          ]}
        />

        <RulesNewForm isEdit={isEdit} currentRule={currentRule} />
      </Container>
    </Page>
  );
}
