import { VStack } from '@chakra-ui/react';
import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import CreatePool from '../../components/CreatePool';
import Header from '../../components/Header';
import SEO from '../../components/SEO';

const Create: React.FC = () => {
  return (
    <>
      <SEO title="Create Pool" />

      <VStack>
        <Header />

        <CreatePool />
      </VStack>
    </>
  );
};

export default withAuth(Create);
