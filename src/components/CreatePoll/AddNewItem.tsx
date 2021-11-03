import { Flex, Icon, IconButton, theme } from '@chakra-ui/react';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import ICreateItem from '../../interfaces/CreateItem';

interface IProps {
  setItems: React.Dispatch<React.SetStateAction<ICreateItem[]>>;
}

const AddNewItem: React.FC<IProps> = ({ setItems }) => {
  const addNewItem = () => {
    setItems(items => [...items, { id: uuidv4(), image: '', name: '' }]);
  };

  return (
    <Flex
      justify="center"
      align="center"
      w="250px"
      h="330px"
      border={`4px dashed ${theme.colors.gray[400]}`}
    >
      <IconButton
        w="50px"
        h="50px"
        aria-label="Add one more item"
        bg="gray.400"
        _hover={{
          bg: 'gray.500',
        }}
        onClick={addNewItem}
        icon={<Icon fontSize={24} color="white" as={FiPlus} />}
        borderRadius="full"
      />
    </Flex>
  );
};

export default AddNewItem;
