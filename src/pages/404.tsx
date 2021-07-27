import { Box, Button, Container, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <>
      <Head>
        <title>Not Found | vote.it</title>
      </Head>

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
      <Container display="flex" h="100vh" w="100vw">
        <Box m="auto">
          <Text fontSize={24} fontWeight="600">
            Page not found
          </Text>
          <Link href="/">
            <Button w="100%" colorScheme="blue">
              Go to home
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
};

export default NotFound;
