import { IPost } from '@lib/post/domain/post.interface';
import { PostServices } from '@lib/post/domain/services';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  validateSync,
} from 'class-validator';
import { Exclude } from 'class-transformer';
import { DomainError } from '@lib/errors';
import { v4 as uuidv4 } from 'uuid';

export class PostAggregade extends PostServices implements IPost {
  @IsUUID()
  id: string = uuidv4();

  @IsString()
  @Length(1, 70)
  title: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  messageForMobile: string;

  @IsString()
  @IsNotEmpty()
  preview: string;

  @IsUUID()
  @IsOptional()
  imageId: string;

  @IsUUID()
  authorId: string;

  @IsBoolean()
  @Exclude()
  isPublished = false;

  @IsUUID()
  postTypeId: string;

  @IsString()
  createdAt = new Date().toISOString();

  @IsString()
  updatedAt = new Date().toISOString();

  private constructor() {
    super();
  }

  static create(post: Partial<IPost>) {
    const _post = new PostAggregade();
    Object.assign(_post, post);
    _post.updatedAt = post?.id ? new Date().toISOString() : _post.updatedAt;
    const errors = validateSync(_post);
    if (!!errors.length) {
      throw new DomainError(errors, 'Post not valid');
    }
    return _post;
  }
}
