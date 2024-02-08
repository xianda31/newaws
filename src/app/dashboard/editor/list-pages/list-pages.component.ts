import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { CreatePageInput, Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { GetMenuNameComponent } from '../../../shared/modals/get-menu-name/get-menu-name.component';

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
  pages$: Observable<Page[]> = this.pageService.pages$;

  constructor(
    private pageService: PageService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    this.pageService.pages$.subscribe((pages) => { this.pages = pages; });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.filtered_pages = this.pages.filter((page) => (page.root_menu === this.menu));
    // si une seule page dans le menu, on la sélectionne
    if (this.filtered_pages.length === 1) {
      this.selected_page = this.filtered_pages[0];
      this.select.emit(this.selected_page);
      this.selected_page.label = '(' + this.selected_page.label.toLocaleLowerCase() + ')';
    }
  }

  onSelect(page: Page): void {
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
        viewer: 'ROW',
        public: true,
      };
      this.pageService.createPage(newPage);
    }).catch((error) => {
      console.log('error', error);
    });
  }


}
