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
import SEO from '../../components/SEO';
import { useAuth } from '../../hooks/auth';
import IPoll from '../../interfaces/Poll';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const { data: polls, loading: pollsLoading } = useCollection<IPoll>('polls', {
    where: ['ownerId', '==', user.uid],
    listen: true,
  });

  return (
    <>
      <SEO title="Dashboard" />

      <Header />

      <Container mt={8} maxW="1200px">
        <HStack mb={4}>
          <Heading fontSize={24} mr="auto">
            Your polls:
          </Heading>
          <Link href="/dashboard/create">
            <Button colorScheme="blue" rounded="full">
              Add new poll
            </Button>
          </Link>
        </HStack>

        {!pollsLoading && (
          <VStack align="flex-start">
            {polls.map(poll => (
              <Link key={poll.id} href={`/dashboard/${poll.id}`}>
                <Box cursor="pointer" py={4} px={6} boxShadow="base">
                  <Text>{poll.name}</Text>
                </Box>
              </Link>
            ))}

            {polls.length === 0 && <Text>You dont have any polls :(</Text>}
          </VStack>
        )}
      </Container>
    </>
  );
};

export default withAuth(Dashboard);
