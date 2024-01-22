export enum PictureOrientationTypeEnum {
    Italian = 'ITALIAN',
    Landscape = 'LANDSCAPE',
}
export type PictureOrientationType = keyof typeof PictureOrientationTypeEnum;

export const orientationIcons = {
    [PictureOrientationTypeEnum.Italian]: 'bi bi-file-image',
    [PictureOrientationTypeEnum.Landscape]: 'bi bi-card-image'
};