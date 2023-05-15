import { Field, InputType } from '@nestjs/graphql';
import { CreatePostDto } from '@lib/post/application-services/commands/dto';

@InputType()
export class CreatePostInput implements CreatePostDto {
  @Field()
  title: string;
  @Field()
  message: string;
  @Field()
  messageForMobile: string;
  @Field()
  preview: string;
  authorId: string;
  imageId: string;
  postTypeId: string;
}
