import { CdkDrag, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  pages: Page[] = [];
  filteredPages: Page[] = [];
  pages$: Observable<Page[]> = this.pageService.pages$.pipe(
    map((pages) => pages.filter((page) => (page.root_menu === this.menu ? page : null)))
  );

  constructor(
    private pageService: PageService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('filtering pages by', this.menu);
    this.filteredPages = this.pages.filter((page) => (page.root_menu === this.menu));
    console.log('resulting filteredPages', this.filteredPages);

  }

  ngOnInit(): void {

    this.pageService.pages$.subscribe((pages) => {
      this.pages = pages;
    });
  }
}
