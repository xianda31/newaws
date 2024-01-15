import { CardType } from "src/app/interfaces/page.interface";
import { PictureOrientationTypeEnum } from "src/app/interfaces/picture.interface";



export interface FlashData {
  title: string;
  layout: CardType,
  pictures?: Array<{
    id: string;
    uri: Promise<string>;
    alt: string;
    caption1: string;
    caption2: string;
    orientation: PictureOrientationTypeEnum;
    rank: number;

  }>;
  headline: string;
  body: string;
  date: Date | null | undefined;
  id: string;
}
