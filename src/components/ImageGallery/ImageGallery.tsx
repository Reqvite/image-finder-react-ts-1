import { Image } from '../App';
import { ImageGalleryList } from './ImageGallery.styled';

import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

interface ImageGalleryProps {
  data: Image[];
  toggleModal: (id: number) => void;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  data,
  toggleModal,
}) => {
  return (
    <ImageGalleryList>
      {data.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          webformatURL={webformatURL}
          tags={tags}
          toggleModal={toggleModal}
        />
      ))}
    </ImageGalleryList>
  );
};
