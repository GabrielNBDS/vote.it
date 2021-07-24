import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Input,
  theme,
  VStack,
} from '@chakra-ui/react';
import React, { ChangeEvent, useState } from 'react';
import { FiUpload, FiX } from 'react-icons/fi';
import ICreateItem from '../../interfaces/CreateItem';
import onFileChange from '../../utils/onFileChange';
import ImageCropper from '../ImageCropper';

interface IProps {
  item: ICreateItem;
  isLoading: boolean;
  setItems: React.Dispatch<React.SetStateAction<ICreateItem[]>>;
}

const PoolItem: React.FC<IProps> = ({ item, setItems, isLoading }) => {
  const [currentUploadingImage, setCurrenUploadingImage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setItems(items => {
      return items.map(item_ => {
        if (item.id === item_.id) {
          return { ...item_, name: e.target.value };
        }
        return item_;
      });
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      onFileChange(e, setCurrenUploadingImage);
      setIsUploading(true);
    }
  };

  const handleCompleteImage = (image: string) => {
    setItems(items => {
      return items.map(item_ => {
        if (item.id === item_.id) {
          return { ...item_, image };
        }
        return item_;
      });
    });
    setCurrenUploadingImage(image);
    setIsUploading(false);
  };

  const remove = () => {
    setItems(items => {
      return items.filter(item_ => {
        if (item.id !== item_.id) {
          return item_;
        }
      });
    });
  };

  return (
    <VStack maxW="300px" position="relative">
      <IconButton
        isDisabled={isLoading}
        w="50px"
        h="50px"
        position="absolute"
        top="-16px"
        right="-16px"
        aria-label="Remove this item"
        colorScheme="red"
        onClick={remove}
        icon={<Icon fontSize={24} color="white" as={FiX} />}
        borderRadius="full"
        zIndex={1}
      />
      <Box
        position="relative"
        marginX="auto"
        p={2}
        w="250px"
        h="250px"
        backgroundImage={isUploading ? '' : `url('${item.image}')`}
        bgRepeat="no-repeat"
        bgSize="cover"
        border={`4px dashed ${theme.colors.blue[400]}`}
      >
        {isUploading && (
          <ImageCropper
            aspect={[1, 1]}
            image={currentUploadingImage}
            onComplete={handleCompleteImage}
          />
        )}
        <Button
          isDisabled={isLoading}
          position="absolute"
          bottom="-16px"
          right="-16px"
          cursor="pointer"
          as="label"
          htmlFor={`image-${item.id}`}
          maxW="min-content"
          colorScheme="blue"
          borderRadius="full"
          minW="50px"
          height="50px"
          aria-label="Add Image"
        >
          <Icon as={FiUpload} />
          <input
            onChange={handleImageChange}
            accept="image/x-png,image/jpeg"
            style={{ display: 'none' }}
            id={`image-${item.id}`}
            type="file"
            onClick={e => {
              (e.target as HTMLInputElement).value = null;
            }}
          />
        </Button>
      </Box>

      <FormControl isDisabled={isLoading} isRequired id="item name">
        <FormLabel>Name</FormLabel>
        <Input
          value={item.name}
          onChange={handleNameChange}
          name="item name"
          variant="flushed"
        />
      </FormControl>
    </VStack>
  );
};

export default PoolItem;
