import { SimpleGrid, useDisclosure, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [imgUrl, setImageUrl] = useState('');

  const view = (url: string): JSX.Element => {
    return <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={url} />;
  };

  function handleViewImage(url: string): void {
    setImageUrl(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid
        columns={3}
        spacingX={['0px', '45px']}
        spacingY={['20px', '48px']}
      >
        {cards?.map(card => {
          return (
            <Card
              key={card.id}
              data={card}
              viewImage={() => handleViewImage(card.url)}
            />
          );
        })}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imgUrl} />
    </>
  );
}
