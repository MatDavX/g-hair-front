import { getNameWithSpace } from '@/lib/lib/avatar-format-name';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = {
  name: string;
  image?: string;
};

export function TableAvatar({ name, image = '' }: Props) {
  return (
    <Avatar>
      <AvatarImage src={image} />
      <AvatarFallback>{getNameWithSpace(name)}</AvatarFallback>
    </Avatar>
  );
}
