import { Page } from '../API.service';
export enum CardTypeEnum {
    Textual = 'TEXTUAL',
    Pictural = 'PICTURAL'
}
export type CardType = keyof typeof CardTypeEnum;

export enum PictureOpEnum {
    Add = 'ADD',
    Remove = 'REMOVE',
    Up = 'UP',
    Down = 'DOWN',
    Edit = 'EDIT'
}
export type PictureOp = keyof typeof PictureOpEnum;