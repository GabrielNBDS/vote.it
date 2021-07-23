import React from 'react';
import {
  Icon,
  Container,
  Flex,
  IconButton,
  Text,
  HStack,
  Avatar,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiPower } from 'react-icons/fi';

import { useRouter } from 'next/router';
import { useAuth } from '../hooks/auth';

const Header: React.FC = () => {
  const router = useRouter();

  const { user, signOut } = useAuth();

  return (
    <Flex as="header" width="100%" height="70px">
      <Container display="flex" alignItems="center" maxW="1200px">
        <Link href={router.asPath === '/dashboard' ? '/' : '/dashboard'}>
          <Text cursor="pointer" fontSize={24} fontWeight="bold">
            vote.it
          </Text>
        </Link>

        <HStack ml="auto">
          <Avatar name={user.displayName} src={user.photoURL} />
          <IconButton
            onClick={signOut}
            aria-label="logout"
            colorScheme="red"
            icon={<Icon as={FiPower} />}
          />
        </HStack>
      </Container>
    </Flex>
  );
};

export default Header;
