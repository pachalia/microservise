import { CreatePostDto } from '@lib/post/application-services/commands/dto/create-post.dto';

export class CreatePostCommand {
  constructor(public readonly post: CreatePostDto) {}
}
