import axios, { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import endpoints from 'services/request/endpoints';
import { axiosInstance } from 'services/instance';
import View from './View';
import { GroupPermissionsProps, PermissionsListProps } from './Model';

const ClientNewGroup: React.FC = () => {
  const params = useParams();

  const [, updateState] = useState({});
  const forceUpdate = useCallback(() => updateState({}), []);

  const [typePage, setTypePage] = useState<'New' | 'Edit'>('New');
  const [permissions, setPermissions] = useState<any[]>([]);
  const [PermissionsList, setPermissionsList] = useState([]);
  const [loading, setLoading] = useState(false);

  // edit
  const [currentSelected, setCurrentSelected] = useState<GroupPermissionsProps>({
    id: -1,
    descricao: '',
    permissoes: ''
  });

  function addPermission(forAdd: PermissionsListProps) {
    const name = forAdd.permissao;
    const index = permissions.findIndex((el) => el === name);

    if (index >= 0) {
      const newData = permissions;
      newData.splice(index, 1);
      setPermissions(newData);
      forceUpdate();
    } else {
      setPermissions((old) => [...old, forAdd.permissao]);
    }
  }

  async function getPermissionsList() {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.client.permissions}`;

    try {
      const { data } = await axiosInstance.get(endpoint);
      await setPermissionsList(data);
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  }

  async function callEdit() {
    const endpoint = `${process.env.REACT_APP_BASE_URL}${endpoints.client.groups}/${params.id}`;
    setLoading(true);
    setTypePage('Edit');

    try {
      const { data } = await axiosInstance.get(endpoint);
      await setCurrentSelected(data);
      setPermissions(JSON.parse(data.permissoes));
      setLoading(false);
    } catch (error) {
      console.log('Error', error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getPermissionsList();

    if (params && params.id) {
      setTypePage('Edit');
      callEdit();
    }
  }, []);

  return (
    <View
      loading={loading}
      typePage={typePage}
      permissionsList={PermissionsList}
      permissions={permissions}
      addPermission={(value) => addPermission(value)}
      selected={currentSelected}
    />
  );
};
export default ClientNewGroup;
