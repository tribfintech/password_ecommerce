import React from 'react';
import { useAppSelector } from 'services/request/baseQuery';
import View from './View';

const HomeClient: React.FC = () => {
  const user = useAppSelector((state) => state.AuthClient);

  return <View {...{ user: user.user }} />;
};

export default HomeClient;
