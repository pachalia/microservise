import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreatePostCommand } from './create-post.command';
import { PostAggregade } from '@lib/post';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreatePostCommand)
export class CreatePostCommandHandler
  implements ICommandHandler<CreatePostCommand, PostAggregade>
{
  constructor(private readonly postRepository: PostRepository) {}

  async execute({ post }: CreatePostCommand): Promise<PostAggregade> {
    const postAggregade = PostAggregade.create(post);
    await postAggregade.plainToInstance();
    const createdPost = await this.postRepository
      .save(postAggregade)
      .catch((err) => {
        throw new BadRequestException(err);
      });
    return createdPost;
  }
}
