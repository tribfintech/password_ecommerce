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
import { AttachmentXNewForm } from '../../components/_dashboard/attachment';

// ----------------------------------------------------------------------

export default function AttachmentXCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { companyList } = useSelector((state: RootState) => state.company);
  const isEdit = pathname.includes('edit');
  const currentAttachment = companyList.find((attachment) => paramCase(attachment.name) === name);

  useEffect(() => {
    dispatch(getCompanyList());
  }, [dispatch]);

  return (
    <Page
      title={
        !isEdit
          ? 'Substituto Tributário: Cadastrar novo Anexo'
          : 'Substituto Tributário: Editar Anexo'
      }
    >
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Criar novo Anexo' : 'Editar Anexo'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Anexo X', href: PATH_DASHBOARD.taxSubstitute.attachmentX },
            { name: !isEdit ? 'Novo Anexo' : name }
          ]}
        />

        <AttachmentXNewForm isEdit={isEdit} currentAttachment={currentAttachment} />
      </Container>
    </Page>
  );
}
