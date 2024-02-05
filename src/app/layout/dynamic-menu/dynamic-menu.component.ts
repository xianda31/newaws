import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})



export class DynamicMenuComponent {

  @Input() isLogged: boolean = false;


  menuMap$: Observable<Map<string, Menu[]>> = this.pageService.pages$.pipe(
    map((pages) => this.pageService.buildMenu(this.isLogged)));


  constructor(
    private pageService: PageService,
  ) { }

  // buildMenuMap(pages: Page[]): Map<string, Menu[]> {
  //   let menuMap = new Map<string, Menu[]>([]);

  //   pages.forEach((page) => {
  //     if (!this.isLogged && !page.public) { return; }
  //     const root = page.root_menu;
  //     if (page.hidden) { return; }
  //     const menu = { label: page.label, route_path: 'front/' + page.path, pageId: page.id, page: page };

  //     if (menuMap.has(root)) {
  //       let arr = menuMap.get(root)!;
  //       arr.push(menu);
  //     } else {
  //       menuMap.set(root, [menu]);
  //     };
  //   });

  //   // console.log('menuMap: %o', menuMap);
  //   return menuMap;


  // }

  stripOrder(root: string): string {
    return root.replace(/^\w\#/g, '');
  }
}
