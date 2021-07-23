import React from 'react';
import { Box, Button, Icon, Image, VStack } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../../hooks/auth';

const Auth: React.FC = () => {
  const { signInWithGoogle } = useAuth();

  return (
    <Box
      w="100vw"
      minH="100vh"
      py={16}
      backgroundImage="url('/assets/login-background.svg')"
      backgroundSize="cover"
    >
      <VStack
        spacing={16}
        mx={[4, 'auto']}
        justify="center"
        maxW="max-content"
        p={16}
        bg="white"
        borderRadius="5px"
      >
        <Image src="/assets/logo.svg" h="140px" alt="ecollect logo" />
        <Button
          colorScheme="blue"
          leftIcon={<Icon fontSize={24} color="white" as={FaGoogle} />}
          onClick={signInWithGoogle}
        >
          Login with Google
        </Button>
      </VStack>
    </Box>
  );
};

export default Auth;
