import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { CreatePageInput, Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { GetMenuNameComponent } from '../../../shared/modals/get-menu-name/get-menu-name.component';
import { moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-list-pages',
  templateUrl: './list-pages.component.html',
  styleUrls: ['./list-pages.component.scss'],

})
export class ListPagesComponent implements OnInit, OnChanges {
  @Input() menu: string = '';
  @Output() select = new EventEmitter<Page>();

  pages: Page[] = [];
  filtered_pages: Page[] = [];
  selected_page: Page | null = null;
  // pages$: Observable<Page[]> = this.pageService.pages$;

  constructor(
    private pageService: PageService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.pageService.pages$.subscribe((pages) => {
      this.pages = pages;
      this.filter_pages();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filter_pages();
    if (this.filtered_pages.length === 1) {
      this.select_page(this.filtered_pages[0]);
      // this.selected_page.label =  this.selected_page.label.toLocaleLowerCase() ;
    }
  }

  filter_pages() {
    this.filtered_pages = this.pages
      .filter((page) => (page.root_menu === this.menu))
      .sort((a, b) => (this.get_rank(a.label) > this.get_rank(b.label) ? 1 : -1));
  }

  select_page(page: Page): void {
    this.selected_page = page;
    this.select.emit(page);
  }

  onCreate(): void {
    const modalRef = this.modalService.open(GetMenuNameComponent, { centered: true });
    modalRef.componentInstance.text = 'Donnez un nom à votre nouveau menu';

    modalRef.result.then((label) => {
      const path = this.pageService.generatePath(this.menu, label);
      const newPage: CreatePageInput = {
        root_menu: this.menu,
        label: label,
        hidden: false,
        description: 'nouvelle page',
        path: path,
        viewer: 'ROW',    // par défaut
        public: true,
      };
      this.pageService.createPage(newPage);
    }).catch((error) => {
      console.log('error', error);
    });
  }

  dropped(event: any) {
    moveItemInArray(this.filtered_pages, event.previousIndex, event.currentIndex);
    console.log('dropped', this.filtered_pages);
    this.filtered_pages.forEach((page, index) => {
      page.label = index + '#' + this.strip_order(page.label);
      this.pageService.updatePage(page);
    });
  }

  strip_order(root: string): string {
    return root.replace(/^\w\#/g, '');
  }
  get_rank(label: string): number {
    return label.split('#')[0] ? parseInt(label.split('#')[0]) : 0;
  }
}
