import { Page } from '../API.service';
export enum CardTypeEnum {
    Textual = 'TEXTUAL',
    Pictural = 'PICTURAL',
    File = 'FILE'
}
export type CardType = keyof typeof CardTypeEnum;

export enum PictureOpEnum {
    Delete = 'DELETE',
    Left = 'LEFT',
    Right = 'RIGHT',
    Edit = 'EDIT'
}
export type PictureOp = keyof typeof PictureOpEnum;

export enum PageViewerEnum {
    Side = 'SIDE',
    Rows = 'ROWS',
    Columns = 'COLUMNS'
}
export type PageViewer = keyof typeof PageViewerEnum;
export const pageViewIcons = {
    [PageViewerEnum.Side]: 'bi bi-layout-text-sidebar-reverse',
    [PageViewerEnum.Rows]: 'bi bi-view-stacked',
    [PageViewerEnum.Columns]: 'bi bi-layout-three-columns'
};