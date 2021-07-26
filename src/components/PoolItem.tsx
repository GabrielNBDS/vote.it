import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';
import IItem from '../../interfaces/Item';

interface IProps {
  item: IItem;
}

const PoolItem: React.FC<IProps> = ({ item }) => {
  return (
    <VStack maxW="300px" position="relative">
      <Box
        marginX="auto"
        p={2}
        w="250px"
        h="250px"
        backgroundImage={`url('${item.image}')`}
        bgRepeat="no-repeat"
        bgSize="cover"
      />

      <Box textAlign="center">
        <Text fontWeight="600" fontSize={18}>
          {item.name}
        </Text>
        <Text>Votes: {item.votes}</Text>
      </Box>
    </VStack>
  );
};

export default PoolItem;
