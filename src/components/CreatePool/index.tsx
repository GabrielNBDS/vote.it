import React, { FormEvent, useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import PoolItem from './PoolItem';
import AddNewItem from './AddNewItem';
import ICreateItem from '../../interfaces/CreateItem';
import { cdn, db } from '../../lib/firebase';
import { useAuth } from '../../hooks/auth';

const CreatePool: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState<ICreateItem[]>([
    { id: uuidv4(), image: '', name: '' },
  ]);

  const [poolName, setPoolName] = useState('');

  const [error, setError] = useState('');

  const handleCreatePool = async (e: FormEvent) => {
    e.preventDefault();

    setError('');

    let allItemsHaveImages = true;

    items.forEach(item => {
      if (item.image === '') {
        allItemsHaveImages = false;
      }
    });

    if (!allItemsHaveImages) {
      setError('Add images to all the items.');
      return;
    }

    setIsLoading(true);

    const blobsRequests = items.map(item => fetch(item.image));

    const imagesRequests = (await Promise.all(blobsRequests)).map(image => {
      return image.blob();
    });

    const images = await Promise.all(imagesRequests);

    const childNames = [];

    const uploadsRef = images.map(image => {
      const childName = `${uuidv4()}.${image.type.slice(6)}`;

      childNames.push(childName);

      const ref = cdn.child(childName);

      return ref.put(image);
    });

    await Promise.all(uploadsRef);

    const batch = db.batch();

    const poolRef = await db.collection('pools').doc();

    batch.set(poolRef, {
      poolName,
      ownerId: user.uid,
    });

    const imagesUrlRef = childNames.map(childName => {
      const imageRef = cdn.child(childName);
      return imageRef.getDownloadURL();
    });

    const imagesUrl = await Promise.all(imagesUrlRef);

    imagesUrl.forEach((image, index) => {
      const dbRef = db
        .collection('pools')
        .doc(poolRef.id)
        .collection('items')
        .doc();

      batch.set(dbRef, {
        itemName: items[index].name,
        image,
      });
    });

    await batch.commit();

    toast({
      title: 'Pool created.',
      status: 'success',
      duration: 2500,
      isClosable: true,
    });

    router.push('/dashboard');
  };

  return (
    <Container pb={8} maxW="1200px">
      <Stack align="center" spacing={8} as="form" onSubmit={handleCreatePool}>
        <Heading mr="auto">Create a Pool</Heading>

        <FormControl isDisabled={isLoading} isRequired id="pool name">
          <FormLabel>Pool Name </FormLabel>
          <Input
            value={poolName}
            onChange={e => setPoolName(e.target.value)}
            name="pool name"
            variant="flushed"
          />
        </FormControl>

        <Flex
          display="inline-flex"
          w="100%"
          flexWrap="wrap"
          justifyContent="center"
          style={{ gap: '40px' }}
        >
          {items.map(item => (
            <PoolItem
              isLoading={isLoading}
              key={item.id}
              item={item}
              setItems={setItems}
            />
          ))}

          <AddNewItem setItems={setItems} />
        </Flex>

        {error && (
          <Alert maxW="max-content" status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{error}</AlertTitle>
          </Alert>
        )}

        <Button
          isLoading={isLoading}
          type="submit"
          maxW="max-content"
          colorScheme="blue"
        >
          Create Pool
        </Button>
      </Stack>
    </Container>
  );
};

export default CreatePool;
