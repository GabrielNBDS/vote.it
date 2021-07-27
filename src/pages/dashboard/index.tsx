import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useCollection } from '@nandorojo/swr-firestore';
import Link from 'next/link';
import React from 'react';
import withAuth from '../../components/auth/WithAuth';
import Header from '../../components/Header';
import { useAuth } from '../../hooks/auth';
import IPool from '../../interfaces/Pool';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: pools, loading: poolsLoading } = useCollection<IPool>('pools', {
    where: ['ownerId', '==', user.uid],
    listen: true,
  });

  return (
    <>
      <Header />

      <Container mt={8} maxW="1200px">
        <HStack mb={4}>
          <Heading fontSize={24} mr="auto">
            Your pools:
          </Heading>
          <Link href="/dashboard/create">
            <Button colorScheme="blue" rounded="full">
              Add new pool
            </Button>
          </Link>
        </HStack>

        {!poolsLoading && (
          <VStack align="flex-start">
            {pools.map(pool => (
              <Link key={pool.id} href={`/dashboard/${pool.id}`}>
                <Box cursor="pointer" py={4} px={6} boxShadow="base">
                  <Text>{pool.name}</Text>
                </Box>
              </Link>
            ))}

            {pools.length === 0 && <Text>You dont have any pools :(</Text>}
          </VStack>
        )}
      </Container>
    </>
  );
};

export default withAuth(Dashboard);
