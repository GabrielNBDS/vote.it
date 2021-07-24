import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import Header from '../../components/Header';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default withAuth(Dashboard);
