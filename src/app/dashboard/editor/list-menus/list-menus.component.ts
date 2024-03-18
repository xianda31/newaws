import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';

import { Component, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, max } from 'rxjs';
import { CreatePageInput, Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { GetMenuNameComponent } from '../../../shared/modals/get-menu-name/get-menu-name.component';

@Component({
  selector: 'app-list-menus',
  templateUrl: './list-menus.component.html',
  styleUrl: './list-menus.component.scss'
})
export class ListMenusComponent {

  @Output() select = new EventEmitter<string>();
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
    private modalService: NgbModal,

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
      this.drag_list = Object.keys(root_menus).map((key) => ({ key, rank: this.get_rank(key) }));
      this.fix_list = Object.keys(hidden_menus).map((key) => ({ key, rank: this.get_rank(key) }));
    });
  }

  onSelect(menu: string): void {
    this.selected_key = menu;
    this.select.emit(menu);

  }
  get_rank(root: string): number {
    return root.split('#')[0] ? parseInt(root.split('#')[0]) : 0;
  }
  strip_order(root: string): string {
    return root.replace(/^\w\#/g, '');
  }

  onCreate(): void {
    const modalRef = this.modalService.open(GetMenuNameComponent, { centered: true });
    modalRef.componentInstance.text = 'Donnez un nom à votre nouveau menu';

    modalRef.result.then((menu) => {
      console.log('result', menu);
      const path = this.pageService.generatePath(menu, menu);
      const max_rank = this.drag_list.reduce((max, item) => (item.rank > max ? item.rank : max), 0);
      const newPage: CreatePageInput = {
        root_menu: (max_rank + 1) + '#' + menu,
        label: menu,
        hidden: false,
        description: 'nouvelle page',
        path: path,
        viewer: 'ROWS',
        public: true,
      };
      this.pageService.createPage(newPage);
    }).catch((error) => {
      console.log('error', error);
    });
  }

  dropped(event: any) {
    moveItemInArray(this.drag_list, event.previousIndex, event.currentIndex);
    this.drag_list.forEach((root_menu, index) => {
      root_menu.rank = 1 + index
      this.pages.forEach((page) => {
        if (page.root_menu === root_menu.key) {
          page.root_menu = root_menu.rank + '#' + this.strip_order(page.root_menu);
          this.pageService.updatePage(page);
        }
      }
      );
    });
  }
}
