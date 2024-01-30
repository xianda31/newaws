import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, EventEmitter, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.scss'
})
export class ListMenusComponent {

  @Output() selectedMenu = new EventEmitter<string>();
  pages: Page[] = [];
  pages$: Observable<Page[]> = this.pageService.pages$.pipe(
    map((pages) => pages.sort((a, b) => (a.root_menu < b.root_menu ? 1 : -1))),
    map((pages) => pages.sort((a, b) => (a.hidden ? 1 : -1))),
  );
  drag_list: { key: string, rank: number }[] = [];
  fix_list: { key: string, rank: number }[] = [];
  selected_key: string = '';

  constructor(
    private pageService: PageService,
  ) { }

  ngOnInit(): void {

    this.pages$.subscribe((pages) => {
      this.pages = pages;
      let root_menus: { [key: string]: number } = {};
      let hidden_menus: { [key: string]: number } = {};
      pages.forEach((page) => {
        if (page.hidden) {
          hidden_menus[page.root_menu] = hidden_menus[page.root_menu] ? hidden_menus[page.root_menu] + 1 : 1;
        } else {
          root_menus[page.root_menu] = root_menus[page.root_menu] ? root_menus[page.root_menu] + 1 : 1;
        }
      });
      this.drag_list = Object.keys(root_menus).map((key) => ({ key, rank: this.extractRank(key) }));
      this.fix_list = Object.keys(hidden_menus).map((key) => ({ key, rank: this.extractRank(key) }));
    });
  }

  onSelect(menu: string): void {
    this.selected_key = menu;
    this.selectedMenu.emit(menu);

  }
  extractRank(root: string): number {
    return root.split('#')[0] ? parseInt(root.split('#')[0]) : 0;
  }
  stripOrder(root: string): string {
    return root.replace(/^\w\#/g, '');
  }


  dropped(event: any) {
    moveItemInArray(this.drag_list, event.previousIndex, event.currentIndex);
    this.drag_list.forEach((root_menu, index) => {
      root_menu.rank = 1 + index
      this.pages.forEach((page) => {
        if (page.root_menu === root_menu.key) {
          page.root_menu = root_menu.rank + '#' + this.stripOrder(page.root_menu);
          this.pageService.updatePage(page);
        }
      }
      );
    });
  }
}
