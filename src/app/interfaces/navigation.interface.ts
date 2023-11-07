
import { Route } from '@angular/router';

// export class MenuItem {
//     label!: string;

//     endItem!: boolean;
//     pageId!: string;
//     subItems!: MenuItem[];
//     routerLink?: string;
//     page_param?: any;
// }


// export interface oldPage {
//     id: string;
//     title: string;
//     description: string;
//     componentId: string;
//     param?: string;
//     // _route?: Route;
// }


export class Page {
    id!: string;
    nav!: string;
    title!: string;
    description!: string;
    viewer!: string;
    // category?: string | null;
    route_path?: string;     // path without parameter extracted from the viewer component's path
}

export class Menu {
    label !: string;
    pageId!: string;
    page?: Page;
}