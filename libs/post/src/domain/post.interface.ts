export interface IPost {
  /** Идентификатор поста  */
  id: string;

  /** Заголовок поста  */
  title: string;

  /** Сообщение поста  */
  message: string;

  /** Сообщение поста для мобильных устройств  */
  messageForMobile: string;

  /** Превью поста  */
  preview: string;

  /** Идентификатор изображения поста  */
  imageId: string;

  /** Идентификатор автора поста  */
  authorId: string;

  /** Опубликован пост или нет  */
  isPublished: boolean;

  /** Идентификатор типа поста  */
  postTypeId: string;

  /** Дата создания поста  */
  createdAt: string;

  /** Дата обновления поста  */
  updatedAt: string;
}
