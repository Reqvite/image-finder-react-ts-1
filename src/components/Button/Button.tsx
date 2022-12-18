import { LoadMoreButton } from './Button.styled';

interface ButtonProps {
  loadMore: () => void;
}
export const Button: React.FC<ButtonProps> = ({ loadMore }) => {
  return <LoadMoreButton onClick={loadMore}>Load more</LoadMoreButton>;
};
