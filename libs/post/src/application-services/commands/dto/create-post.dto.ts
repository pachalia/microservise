import { IPost } from '@lib/post';

export type CreatePostDto = Pick<
  IPost,
  | 'title'
  | 'message'
  | 'preview'
  | 'messageForMobile'
  | 'authorId'
  | 'postTypeId'
  | 'imageId'
>;
