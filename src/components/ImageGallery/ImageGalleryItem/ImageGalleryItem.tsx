import { GalleryListItem, GalleryImg } from './ImageGalleryItem.styled';

interface ImageGalleryItemProps {
  webformatURL: string;
  id: number;
  tags: string;
  toggleModal: (id: number) => void;
}

export const ImageGalleryItem: React.FC<ImageGalleryItemProps> = ({
  webformatURL,
  id,
  tags,
  toggleModal,
}) => {
  return (
    <GalleryListItem onClick={() => toggleModal(id)}>
      <GalleryImg src={webformatURL} alt={tags} />
    </GalleryListItem>
  );
};
