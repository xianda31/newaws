import { Category } from "./category.interface"

export interface Article {
  id: string;
  title: string,
  permalink: string,
  categoryId: Category,
  summary: string,
  content: string,
  imgPath: string,
  isPublished: boolean,
  createdAt: Date

}
