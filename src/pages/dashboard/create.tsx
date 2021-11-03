import { VStack } from '@chakra-ui/react';
import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import CreatePoll from '../../components/CreatePoll';
import Header from '../../components/Header';
import SEO from '../../components/SEO';

const Create: React.FC = () => {
  return (
    <>
      <SEO title="Create Poll" />

      <VStack>
        <Header />

        <CreatePoll />
      </VStack>
    </>
  );
};

export default withAuth(Create);
