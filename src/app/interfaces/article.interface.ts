import { PictureOrientationTypeEnum } from "src/app/interfaces/picture.interface";
import { Picture } from "../API.service";


export const Layouts = {
  Textual: 'un titre et un texte editable',
  Pictural: 'un titre et des images',
  File: 'un titre et des fichiers'
};
export type Layout = keyof typeof Layouts;

export const LayoutIcons = {
  Textual: 'bi bi bi-card-text',
  Pictural: 'bi bi-card-image',
  File: 'bi bi-file-earmark-font-fill'
};


export enum PictureOpEnum {
  Delete = 'DELETE',
  Left = 'LEFT',
  Right = 'RIGHT',
  Edit = 'EDIT'
}
export type PictureOp = keyof typeof PictureOpEnum;

export interface ArticleData {
  title: string;
  layout: Layout,
  pictures?: Array<{
    id: string;
    uri: Promise<string>;
    alt: string;
    caption1: string;
    caption2: string;
    orientation: PictureOrientationTypeEnum;
    rank: number;
    filename?: string;
  }>;

  headline: string;
  body: string;
  date: Date | null | undefined;
  root: string;
  sub_folder: string;
  id: string;
}

export interface ArticleInterface {
  title: string;
  layout: Layout,
  pictures?: {
    items: Picture[]
  },
  headline: string;
  body: string;
  date: Date | null | undefined;
  root: string;
  sub_folder: string;
  id: string;
}
