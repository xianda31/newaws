import { Page } from '../API.service';


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