import { IPost } from '@lib/post';

export type UpdatePostDto = Partial<
  Pick<IPost, 'title' | 'message' | 'messageForMobile' | 'imageId' | 'preview'>
> &
  Pick<IPost, 'id' | 'authorId' | 'postTypeId'>;
