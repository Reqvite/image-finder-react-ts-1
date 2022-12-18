import { NotificationStyled } from './Notifications.styled';

interface NotificationProps {
  error: null | string;
}
export const Notification: React.FC<NotificationProps> = ({ error }) => {
  return (
    <>
      <NotificationStyled>{error}</NotificationStyled>
    </>
  );
};
