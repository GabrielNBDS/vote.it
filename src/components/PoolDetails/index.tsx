import React from 'react';
import { useCollection, useDocument } from '@nandorojo/swr-firestore';
import { useRouter } from 'next/router';
import {
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Spinner,
  Stack,
  useClipboard,
  useToast,
} from '@chakra-ui/react';
import HSBar from 'react-horizontal-stacked-bar-chart';
import IPool from '../../interfaces/Pool';
import PoolItem from '../PoolItem';
import IItem from '../../interfaces/Item';
import SEO from '../SEO';

const chartColors = ['#3182CE', '#E53E3E', '#38A169'];

const PoolDetails: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const id = router.query.id as string;

  const { data: pool, loading: poolLoading } = useDocument<IPool>(
    `pools/${id}`,
  );

  const { data: items, loading: itemsLoading } = useCollection<IItem>(
    `pools/${id}/items`,
    { listen: true, orderBy: ['name', 'asc'] },
  );

  const { onCopy: copyLink } = useClipboard(
    `https://voteit.gabrielnbds.dev/${id || ''}`,
  );

  const { onCopy: copyCode } = useClipboard(id || '');

  if (poolLoading || itemsLoading) {
    return (
      <Flex height="10vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <SEO title={pool?.name || ''} shouldExcludeTitleSuffix={poolLoading} />

      <Container mt={8} pb={8} maxW="1200px">
        <Stack align="center" spacing={8}>
          <HStack>
            <Heading mx="auto">{pool.name}</Heading>
            <Button
              onClick={() => {
                copyCode();
                toast({
                  duration: 1000,
                  isClosable: true,
                  status: 'success',
                  title: 'Code Copied!',
                });
              }}
              colorScheme="blue"
              size="sm"
            >
              Copy pool code
            </Button>
            <Button
              onClick={() => {
                copyLink();
                toast({
                  duration: 1000,
                  isClosable: true,
                  status: 'success',
                  title: 'Link Copied!',
                });
              }}
              colorScheme="cyan"
              color="white"
              size="sm"
            >
              Copy link to pool
            </Button>
          </HStack>

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
    </>
  );
};

export default PoolDetails;
