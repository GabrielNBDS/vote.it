import React, { FormEvent, useState, useEffect } from 'react';
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
import PollItem from './PollItem';
import AddNewItem from './AddNewItem';
import ICreateItem from '../../interfaces/CreateItem';
import { cdn, db } from '../../lib/firebase';
import { useAuth } from '../../hooks/auth';

const CreatePoll: React.FC = () => {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const [items, setItems] = useState<ICreateItem[]>([
    { id: uuidv4(), image: '', name: '' },
  ]);

  const [pollName, setPollName] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
  }, [items]);

  const handleCreatePoll = async (e: FormEvent) => {
    e.preventDefault();

    setError('');

    if (items.length < 1) {
      setError('Add at least one item.');
      return;
    }

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

      const ref = cdn.ref().child(childName);

      return ref.put(image);
    });

    await Promise.all(uploadsRef);

    const batch = db.batch();

    const pollRef = db.collection('polls').doc();

    batch.set(pollRef, {
      name: pollName,
      ownerId: user.uid,
    });

    const imagesUrlRef = childNames.map(childName => {
      const imageRef = cdn.ref().child(childName);
      return imageRef.getDownloadURL();
    });

    const imagesUrl = await Promise.all(imagesUrlRef);

    imagesUrl.forEach((image, index) => {
      const dbRef = db
        .collection('polls')
        .doc(pollRef.id)
        .collection('items')
        .doc();

      batch.set(dbRef, {
        name: items[index].name,
        image,
        votes: 0,
      });
    });

    await batch.commit();

    toast({
      title: 'Poll created.',
      status: 'success',
      duration: 2500,
      isClosable: true,
    });

    router.push('/dashboard');
  };

  return (
    <Container pb={8} maxW="1200px">
      <Stack align="center" spacing={8} as="form" onSubmit={handleCreatePoll}>
        <Heading mr="auto">Create a Poll</Heading>

        <FormControl isDisabled={isLoading} isRequired id="Poll name">
          <FormLabel>Poll Name </FormLabel>
          <Input
            value={pollName}
            onChange={e => setPollName(e.target.value)}
            name="Poll name"
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
            <PollItem
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
          Create Poll
        </Button>
      </Stack>
    </Container>
  );
};

export default CreatePoll;
