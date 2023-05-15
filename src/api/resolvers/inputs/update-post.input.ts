import { Field, ID, InputType } from '@nestjs/graphql';
import { UpdatePostDto } from '@lib/post/application-services/commands/dto';

@InputType()
export class UpdatePostInput implements UpdatePostDto {
  @Field(() => ID)
  id: string;
  @Field({ nullable: true })
  title: string;
  @Field({ nullable: true })
  message: string;
  @Field({ nullable: true })
  messageForMobile: string;
  @Field({ nullable: true })
  preview: string;
  authorId: string;
  imageId: string;
  postTypeId: string;
}
