import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import { ClientUsersResponseProps } from 'services/request/models/response';
import { CompanyUserProps } from './Model';
import View from './View';

const ClientNewUser: React.FC = () => {
  const params = useParams();
  const [typePage, setTypePage] = useState<'New' | 'Edit'>('New');
  const [groupPermissions, setGroupPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // edit
  const [currentSelected, setCurrentSelected] = useState<ClientUsersResponseProps>({
    ativo: true,
    celular: '',
    cpf: '',
    created_at: '',
    email: '',
    id: -1,
    nome: '',
    // grupo_permissao: {
    //   deleted_at: null,
    //   descricao: '',
    //   permissoes: '',
    //   updated_at: '',
    //   id: 0
    // },
    updated_at: '',
    deleted_at: null,
    empresa_cliente_id: 0,
    grupo_permissao: 0
  });

  async function getGroupPermissionsList() {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.client.groups}`;

    try {
      const { data } = await axiosInstance.get(endpoint);
      await setGroupPermissions(data);
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  }

  async function callEdit() {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.client.user}/${params.id}`;
    setLoading(true);
    setTypePage('Edit');

    try {
      const { data } = await axiosInstance.get(endpoint);
      await setCurrentSelected(data);
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getGroupPermissionsList();

    if (params && params.id) {
      setTypePage('Edit');
      callEdit();
    }
  }, []);

  return (
    <View
      loading={loading}
      typePage={typePage}
      listGroups={groupPermissions}
      selected={currentSelected}
      changePassword={changePassword}
      setChangePassword={setChangePassword}
    />
  );
};
export default ClientNewUser;
