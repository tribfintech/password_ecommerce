// hooks
import useAuth from '../hooks/useAuth';
//
import { MAvatar } from './@material-extend';
import { MAvatarProps } from './@material-extend/MAvatar';
import createAvatar from '../utils/createAvatar';
import AvatarDefault from '../assets/images/defaultPerson.png';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }: MAvatarProps) {
  const { user } = useAuth();

  return (
    <MAvatar
      src={AvatarDefault}
      alt={user?.displayName}
      color={user?.photoURL ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </MAvatar>
  );
}
