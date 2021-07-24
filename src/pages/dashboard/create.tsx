import { VStack } from '@chakra-ui/react';
import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import CreatePool from '../../components/CreatePool';
import Header from '../../components/Header';

const Create: React.FC = () => {
  return (
    <VStack>
      <Header />

      <CreatePool />
    </VStack>
  );
};

export default withAuth(Create);
