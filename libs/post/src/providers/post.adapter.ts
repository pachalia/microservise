import { Injectable, Logger } from '@nestjs/common';
import { PostRepository } from '@lib/post/providers/post.repository';
import { PaginationDto } from '@lib/shared/dto';
import { IPost, PostAggregade } from '@lib/post';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '@lib/entities';
import { FindManyOptions, Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class PostAdapter implements PostRepository {
  private readonly logger = new Logger(PostAdapter.name);

  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  async save(post: IPost): Promise<PostAggregade> {
    console.log(post);
    const existPost = await this.findOne(post.id);
    if (existPost) {
      const { id, ...toUpdate } = post;
      await this.postRepository.update({ id }, toUpdate);
      return this.findOne(post.id);
    }
    const savedPost = await this.postRepository.save(post);
    return PostAggregade.create(savedPost);
  }

  async findOne(id: string): Promise<PostAggregade> {
    const existPost = await this.postRepository
      .findOneBy({ id })
      .catch((err) => {
        this.logger.error(err);
        return null;
      });
    if (!existPost) {
      return null;
    }
    return PostAggregade.create(existPost);
  }

  async findAll(pagination: PaginationDto): Promise<[PostAggregade[], number]> {
    const {
      limit: take,
      offset: skip,
      postType: postTypeId,
    } = plainToInstance(PaginationDto, pagination);
    const options: FindManyOptions<PostEntity> = postTypeId
      ? {
          where: {
            postTypeId,
          },
          take,
          skip,
          order: {
            createdAt: 'DESC',
          },
        }
      : { take, skip, order: { createdAt: 'DESC' } };
    const [data, count] = await this.postRepository
      .findAndCount(options)
      .catch((err) => {
        this.logger.error(err);
        return [[], 0] as [PostEntity[], number];
      });
    return [data.map((post) => PostAggregade.create(post)), count];
  }
  async delete(id: string): Promise<boolean> {
    const result = await this.postRepository.delete({ id }).catch((err) => {
      this.logger.error(err);
      return false;
    });
    return !!result;
  }
}
