export enum PictureOrientationTypeEnum {
    Portrait = 'PORTRAIT',
    Landscape = 'LANDSCAPE',
}
export type PictureOrientationType = keyof typeof PictureOrientationTypeEnum;