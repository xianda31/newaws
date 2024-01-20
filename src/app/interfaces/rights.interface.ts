// rights: ['Admin', 'Publisher', 'Sales'],
export enum RightTypeEnum {
    Admin = 'Admin',
    Publisher = 'Publisher',
    Sales = 'Sales',
}
export type RightType = keyof typeof RightTypeEnum;