import { IPost } from '@lib/post';

export interface ISetPublished {
  setNotPublished(): void;
}

export const SET_PUBLISHED = async function (this: IPost) {
  this.isPublished = true;
};
