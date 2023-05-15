import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatePostCommand } from '@lib/post/application-services/commands/update-post/update-post.command';
import { PostAggregade } from '@lib/post';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(UpdatePostCommand)
export class UpdatePostCommandHandler
  implements ICommandHandler<UpdatePostCommand, PostAggregade>
{
  private readonly logger = new Logger(UpdatePostCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ post }: UpdatePostCommand): Promise<PostAggregade> {
    const existPost = await this.postRepository
      .findOne(post.id)
      .catch((err) => {
        this.logger.error(err);
        return null as PostAggregade;
      });
    if (!existPost) {
      throw new BadRequestException(`Post by id ${post.id} not found`);
    }
    Object.assign(existPost, post);
    const postAgreggade = PostAggregade.create(existPost);
    postAgreggade.plainToInstance();
    await this.postRepository.save(postAgreggade);
    return postAgreggade;
  }
}
