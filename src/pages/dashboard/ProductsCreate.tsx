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
import { ProductNewForm } from '../../components/_dashboard/products';

// ----------------------------------------------------------------------

export default function ProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentProduct = companyList.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page title={!isEdit ? 'Cadastros: Cadastrar Novo Produto' : 'Cadastros: Editar Produto'}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar novo Produto' : 'Editar Produto'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Produtos', href: PATH_DASHBOARD.registers.products },
            { name: !isEdit ? 'Novo Produto' : name }
          ]}
        />

        <ProductNewForm isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
