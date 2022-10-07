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
import { SegmentNewForm } from '../../components/_dashboard/segments';

// ----------------------------------------------------------------------

export default function SegmentCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentSegment = companyList.find((segment) => paramCase(segment.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page
      title={
        !isEdit
          ? 'Substituto Tributário: Cadastrar novo Segmento'
          : 'Substituto Tributário: Editar Segmento'
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar Novo Segmento' : 'Editar Segmento'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Segmentos', href: PATH_DASHBOARD.taxSubstitute.segments },
            { name: !isEdit ? 'Novo Segmento' : name }
          ]}
        />

        <SegmentNewForm isEdit={isEdit} currentSegment={currentSegment} />
      </Container>
    </Page>
  );
}
