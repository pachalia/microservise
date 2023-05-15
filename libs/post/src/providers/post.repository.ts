import { IPost, PostAggregade } from '@lib/post';
import { PaginationDto } from '@lib/shared/dto';

export abstract class PostRepository {
  abstract save(post: IPost): Promise<PostAggregade>;
  abstract findOne(id: string): Promise<PostAggregade | null>;
  abstract findAll(
    pagination: PaginationDto,
  ): Promise<[PostAggregade[], number]>;
  abstract delete(id: string): Promise<boolean>;
}
