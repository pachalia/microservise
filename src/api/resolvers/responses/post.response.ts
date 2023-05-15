import { IPost } from '@lib/post';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostResponse implements Omit<IPost, 'isPublished'> {
  @Field(() => ID, { description: 'Идентификатор поста' })
  id: string;

  @Field({ description: 'Заголовок поста' })
  title: string;

  @Field({ description: 'Сообщение поста' })
  message: string;

  @Field({ description: 'Сообщение поста для мобильной версии' })
  messageForMobile: string;

  @Field({ description: 'Превью поста' })
  preview: string;

  @Field({ description: 'Идентификатор для изображеения поста' })
  imageId: string;

  @Field({ description: 'Идентификатор автора поста' })
  authorId: string;

  @Field({ description: 'Идентификатор типа поста' })
  postTypeId: string;

  @Field({ description: 'Дата создания поста' })
  createdAt: string;

  @Field({ description: 'Дата обновления поста' })
  updatedAt: string;
}
