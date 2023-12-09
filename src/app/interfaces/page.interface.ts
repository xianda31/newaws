import { Page } from '../API.service';
export enum CardTypeEnum {
    Textual = 'TEXTUAL',
    Pictural = 'PICTURAL'
}
export type CardType = keyof typeof CardTypeEnum;

export enum PictureOpEnum {
    Delete = 'DELETE',
    Left = 'LEFT',
    Right = 'RIGHT',
    Edit = 'EDIT'
}
export type PictureOp = keyof typeof PictureOpEnum;