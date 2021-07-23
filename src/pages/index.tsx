import React from 'react';
import Link from 'next/link';
import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

const SplitScreen: React.FC = () => {
  return (
    <Stack minH="100vh" direction={{ base: 'column', md: 'row' }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={6} w="full" maxW="lg">
          <Image
            display={['block', 'block', 'none']}
            mr="auto"
            height="150px"
            src="/assets/logo.svg"
          />

          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as="span"
              color="black"
              position="relative"
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: 'blue.400',
                zIndex: -1,
              }}
            >
              Voting pools
            </Text>
            <br />{' '}
            <Text color="blue.400" as="span">
              for everyone
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color="gray.500">
            &quot;vote.it&quot; is the best place to create and vote in any kind
            of pools.
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              colorScheme="blue"
              cursor="pointer"
              as="a"
              rounded="full"
              color="white"
            >
              Start Voting
            </Button>
            <Link href="/dashboard">
              <Button cursor="pointer" as="a" rounded="full">
                Create a Pool
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
      <Flex
        display={['none', 'none', 'flex']}
        align="center"
        maxH="100vh"
        flex={1}
      >
        <Image alt="vote.it logo" h="250px" src="/assets/logo.svg" />
      </Flex>
    </Stack>
  );
};

export default SplitScreen;
