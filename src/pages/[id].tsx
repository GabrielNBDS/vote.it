import React, { useCallback } from 'react';
import {
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import fire, { db } from '../lib/firebase';
import IPoll from '../interfaces/Poll';
import IItem from '../interfaces/Item';
import VoteItem from '../components/VoteItem';
import SEO from '../components/SEO';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const id = ctx.params.id as string;

  const pollDocument = await db.collection('polls').doc(id).get();

  if (!pollDocument.exists) {
    return {
      notFound: true,
    };
  }

  const poll = pollDocument.data() as IPoll;

  const itemsSnapshot = await db
    .collection('polls')
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
      poll: { ...poll, id },
      items,
    },
  };
};

interface IProps {
  poll: IPoll;
  items: IItem[];
}

const Vote: React.FC<IProps> = ({ poll, items }) => {
  const toast = useToast();

  const vote = useCallback((id: string) => {
    db.collection('polls')
      .doc(poll.id)
      .collection('items')
      .doc(id)
      .update({
        votes: fire.firestore.FieldValue.increment(1),
      });

    toast({
      duration: 1000,
      isClosable: true,
      status: 'success',
      title: 'Voted!',
    });
  }, []);

  return (
    <>
      <SEO
        title={poll.name}
        shouldIndexPage
        description={`Vote on ${poll.name}`}
      />

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
            {poll.name}
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
