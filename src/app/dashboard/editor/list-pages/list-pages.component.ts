import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { pageViewIcons } from 'src/app/interfaces/page.interface';
import { ToastService } from 'src/app/tools/service/toast.service';

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
  selected_page!: Page;
  pages$: Observable<Page[]> = this.pageService.pages$.pipe(
    map((pages) => pages.filter((page) => (page.root_menu === this.menu ? page : null)))
  );

  constructor(
    private pageService: PageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('filtering pages by', this.menu);
    this.filtered_pages = this.pages.filter((page) => (page.root_menu === this.menu));
    // console.log('resulting filtered_pages', this.filtered_pages);

  }

  ngOnInit(): void {

    this.pageService.pages$.subscribe((pages) => {
      this.pages = pages;
    });
  }

  onSelect(page: Page): void {
    this.selected_page = page;
    this.select.emit(page);

  }
}
