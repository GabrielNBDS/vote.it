import { Box, Button, Container, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';
import SEO from '../components/SEO';

const NotFound: React.FC = () => {
  return (
    <>
      <SEO title="Not Found" description="Page not found" />

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
