import React from 'react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import {
  Container,
  Flex,
  Heading,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import IPool from '../../interfaces/Pool';
import PoolItem from '../PoolItem';
import IItem from '../../interfaces/Item';

const chartColors = ['#3182CE', '#E53E3E', '#38A169'];

const PoolDetails: React.FC = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const { data: pool, loading: poolLoading } = useDocument<IPool>(
    `pools/${id}`,
  );

  const { data: items, loading: itemsLoading } = useCollection<IItem>(
    `pools/${id}/items`,
    { listen: true, orderBy: ['name', 'asc'] },
  );

  if (poolLoading || itemsLoading) {
    return (
      <Flex height="10vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <Container mt={8} pb={8} maxW="1200px">
      <Stack align="center" spacing={8}>
        <Heading mx="auto">{pool.name}</Heading>

        <Flex
          display="inline-flex"
          w="100%"
          flexWrap="wrap"
          justifyContent="center"
          style={{ gap: '40px' }}
        >
          {items.map(item => (
            <PoolItem key={item.id} item={item} />
          ))}
        </Flex>

        <HSBar
          showTextIn
          data={[...items]
            .filter(item => item.votes > 0)
            .sort((a, b) => (a.votes > b.votes ? -1 : 1))
            .slice(0, 3)
            .map((item, index) => ({
              name: item.name,
              value: item.votes,
              color: chartColors[index],
            }))}
        />
      </Stack>
    </Container>
  );
};

export default PoolDetails;
