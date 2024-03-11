import { PictureOrientationTypeEnum } from "src/app/interfaces/picture.interface";
import { Picture } from "../API.service";
import { environment } from "src/environments/environment";


export const Layouts = {
  Textual: 'un titre et un corps de texte',
  Pictural: 'un titre et des images protégées',
  File: 'un titre et des fichiers protégés',
  Card: 'un titre et des cartes'
};
export type Layout = keyof typeof Layouts;

export const LayoutIcons = {
  Textual: 'bi bi bi-card-text',
  Pictural: 'bi bi-card-image',
  File: 'bi bi-file-earmark-font-fill',
  Card: 'bi bi-window-dock'
};


// export enum PictureOpEnum {
//   Delete = 'DELETE',
//   Left = 'LEFT',
//   Right = 'RIGHT',
//   Edit = 'EDIT'
// }
// export type PictureOp = keyof typeof PictureOpEnum;

// export interface ArticleData {
//   title: string;
//   layout: Layout,
//   pictures?: Array<{
//     id: string;
//     uri: Promise<string>;
//     alt: string;
//     caption1: string;
//     caption2: string;
//     orientation: PictureOrientationTypeEnum;
//     rank: number;
//     filename?: string;
//   }>;

//   headline: string;
//   body: string;
//   date: Date | null | undefined;
//   root: string;
//   sub_folder: string;
//   id: string;
// }

// export interface ArticleInterface {
//   title: string;
//   layout: Layout,
//   pictures?: {
//     items: Picture[]
//   },
//   headline: string;
//   body: string;
//   date: Date | null | undefined;
//   root: string;
//   sub_folder: string;
//   id: string;
// }

export const Article_prefilled: any = {
  // title: '',
  headline: '<h2> Le titre </h2>',
  body: '<div> <div style="float: left;margin-top:0.5em;margin-right:1em;"><img src="../assets/images/bcsto.jpg" style="width:10rem" alt="bcsto"></div><div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque ullamcorper libero non pretium. Sed facilisis nisl nec interdum interdum. Fusce eu lorem quis ante ultrices vehicula ultrices et nunc. Fusce ac velit felis. Aenean faucibus, dolor eget convallis lobortis, mauris sapien porttitor urna, ac dapibus massa velit eu ante. Etiam molestie tincidunt purus a maximus. Nulla sed vehicula metus, non malesuada diam. Nunc imperdiet metus a tellus tincidunt, eget tincidunt augue blandit. </div></div>',
  // layout: 'Textual',
  date: null,
  // rank: 666,
  directory: environment.S3articlesDirectory
};
