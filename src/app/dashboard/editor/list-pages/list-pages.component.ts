import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { CreatePageInput, Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { pageViewIcons } from 'src/app/interfaces/page.interface';
import { ToastService } from 'src/app/toaster/toast.service';
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
  pages$: Observable<Page[]> = this.pageService.pages$.pipe(
    map((pages) => pages.filter((page) => (page.root_menu === this.menu ? page : null)))
  );

  constructor(
    private pageService: PageService,
    private modalService: NgbModal,

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('filtering pages by', this.menu);
    this.filtered_pages = this.pages.filter((page) => (page.root_menu === this.menu));

  }

  ngOnInit(): void {

    this.pageService.pages$.subscribe((pages) => {
      this.pages = pages;
      this.filtered_pages = this.pages.filter((page) => (page.root_menu === this.menu));

    });
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
