import { IsNumber, IsOptional, IsPositive, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PaginationDto {
  @IsOptional()
  @Min(0)
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  @Field(() => Int, { description: 'Пропуск строк' })
  offset = 0;

  @IsOptional()
  @IsNumber({ allowNaN: false, allowInfinity: false })
  @Type(() => Number)
  @IsPositive()
  @Field(() => Int, { description: 'Количество строк' })
  limit = 3;

  @IsOptional()
  @IsUUID()
  @Field({ description: 'Тип поста', nullable: true })
  postType?: string;
}
