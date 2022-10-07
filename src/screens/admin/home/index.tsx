import React from 'react';
import { useAppSelector } from 'services/request/baseQuery';
import View from './View';

const HomeAdmin: React.FC = () => {
  const user = useAppSelector((state) => state.AuthAdmin);
  return <View {...{ user: user.user }} />;
};

export default HomeAdmin;
