
import { Route } from '@angular/router';

export class MenuItem {
    label!: string;

    endItem!: boolean;
    pageId?: string;
    subItems?: MenuItem[];
    routerLink?: string;
    page_param?: any;
}


export interface Page {
    id: string;
    title: string;
    description: string;
    componentId: string;
    param?: string;
    // _route?: Route;
}
