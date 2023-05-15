import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  message: string;

  @Column({ name: 'message_for_mobile' })
  messageForMobile: string;

  @Column()
  preview: string;

  @Column({ name: 'image_id' })
  imageId: string;

  @Column({ name: 'author_id' })
  authorId: string;

  @Column({ name: 'post_type' })
  postTypeId: string;

  @Column({ name: 'is_published' })
  isPublished: boolean;

  @Column({ name: 'created_at' })
  createdAt: string;

  @Column({ name: 'updated_at' })
  updatedAt: string;
}
