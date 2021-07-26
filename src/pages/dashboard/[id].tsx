import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import Header from '../../components/Header';
import PoolDetails from '../../components/PoolDetails';

const Pool: React.FC = () => {
  return (
    <>
      <Header />
      <PoolDetails />
    </>
  );
};

export default withAuth(Pool);
