import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SetPublishedCommand } from '@lib/post/application-services/commands/set-published/set-published.command';
import { PostAggregade } from '@lib/post';
import { PostRepository } from '@lib/post/providers';
import { BadRequestException, Logger } from '@nestjs/common';

@CommandHandler(SetPublishedCommand)
export class SetPublishedCommandHandler
  implements ICommandHandler<SetPublishedCommand, PostAggregade>
{
  private readonly logger = new Logger(SetPublishedCommandHandler.name);
  constructor(private readonly postRepository: PostRepository) {}
  async execute({ id }: SetPublishedCommand): Promise<PostAggregade> {
    const existPost = await this.postRepository.findOne(id).catch((err) => {
      this.logger.error(err);
      return null as PostAggregade;
    });
    if (!existPost) {
      throw new BadRequestException(`Post by id ${id} not found`);
    }
    const postAggregade = PostAggregade.create(existPost);
    postAggregade.setPublished();
    postAggregade.plainToInstance();
    await this.postRepository.save(postAggregade);
    return postAggregade;
  }
}
