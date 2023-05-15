import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('post_type')
export class PostTypeEntity {
  @PrimaryColumn('uuid')
  id: string;
  @Column()
  value: string;
}
