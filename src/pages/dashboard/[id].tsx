import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import Header from '../../components/Header';
import PollDetails from '../../components/PollDetails';

const Poll: React.FC = () => {
  return (
    <>
      <Header />
      <PollDetails />
    </>
  );
};

export default withAuth(Poll);
