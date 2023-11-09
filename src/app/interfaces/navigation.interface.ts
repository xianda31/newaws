


// export class Page {
//     id!: string;
//     root_menu!: string;
//     title!: string;
//     description!: string;
//     viewer!: string;
// }

import { Page } from "../API.service";

export class Menu {
    label !: string;
    route_path!: string;
    pageId!: string;
    page?: Page;
}