import { Page } from '../API.service';
export enum CardViewMode {
    Textual = 'TEXTUAL',
    Pictural = 'PICTURAL'
}
export type CardViewModeStrings = keyof typeof CardViewMode;