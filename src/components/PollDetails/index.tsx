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
import IPoll from '../../interfaces/Poll';
import PollItem from '../PollItem';
import IItem from '../../interfaces/Item';
import SEO from '../SEO';

const chartColors = ['#3182CE', '#E53E3E', '#38A169'];

const PollDetails: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const id = router.query.id as string;

  const { data: Poll, loading: PollLoading } = useDocument<IPoll>(
    `Polls/${id}`,
  );

  const { data: items, loading: itemsLoading } = useCollection<IItem>(
    `Polls/${id}/items`,
    { listen: true, orderBy: ['name', 'asc'] },
  );

  const { onCopy: copyLink } = useClipboard(
    `https://voteit.gabrielnbds.dev/${id || ''}`,
  );

  const { onCopy: copyCode } = useClipboard(id || '');

  if (PollLoading || itemsLoading) {
    return (
      <Flex height="10vh" align="center" justify="center">
        <Spinner />
      </Flex>
    );
  }

  return (
    <>
      <SEO title={Poll?.name || ''} shouldExcludeTitleSuffix={PollLoading} />

      <Container mt={8} pb={8} maxW="1200px">
        <Stack align="center" spacing={8}>
          <HStack>
            <Heading mx="auto">{Poll.name}</Heading>
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
              Copy Poll code
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
              Copy link to Poll
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
              <PollItem key={item.id} item={item} />
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

export default PollDetails;
