import React from 'react';
import { useAppSelector } from 'services/request/baseQuery';
import View from './View';

const HomeCompany: React.FC = () => {
  const user = useAppSelector((state) => state.AuthCompany);

  return <View {...{ user: user.user }} />;
};

export default HomeCompany;
