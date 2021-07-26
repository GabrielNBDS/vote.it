import React, { useCallback } from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import fire, { db } from '../lib/firebase';
import IPool from '../interfaces/Pool';
import IItem from '../interfaces/Item';
import VoteItem from '../components/VoteItem';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.params.id as string;

  const pool = (await (
    await db.collection('pools').doc(id).get()
  ).data()) as IPool;

  const itemsSnapshot = await db
    .collection('pools')
    .doc(id)
    .collection('items')
    .get();

  const items = itemsSnapshot.docs.map(item => {
    const data = item.data();

    const formattedItem = { ...data, id: item.id } as IItem;

    return formattedItem;
  });

  return {
    props: {
      pool: { ...pool, id },
      items,
    },
  };
};

interface IProps {
  pool: IPool;
  items: IItem[];
}

const Vote: React.FC<IProps> = ({ pool, items }) => {
  const vote = useCallback((id: string) => {
    db.collection('pools')
      .doc(pool.id)
      .collection('items')
      .doc(id)
      .update({
        votes: fire.firestore.FieldValue.increment(1),
      });
  }, []);

  return (
    <>
      <Link href="/">
        <Text
          cursor="pointer"
          backgroundColor="blue.500"
          textAlign="center"
          color="white"
        >
          vote.it
        </Text>
      </Link>

      <Container mt={16} pb={8} maxW="1200px">
        <Stack align="center" spacing={8}>
          <Heading as="h1" mx="auto">
            {pool.name}
          </Heading>

          <Flex
            display="inline-flex"
            w="100%"
            flexWrap="wrap"
            justifyContent="center"
            style={{ gap: '40px' }}
          >
            {items.map(item => (
              <VStack key={item.id}>
                <VoteItem item={item} />
                <Button onClick={() => vote(item.id)}>Vote</Button>
              </VStack>
            ))}
          </Flex>
        </Stack>
      </Container>
    </>
  );
};

export default Vote;
