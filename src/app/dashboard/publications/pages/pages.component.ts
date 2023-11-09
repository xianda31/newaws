import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { ToastService } from 'src/app/tools/service/toast.service';
import { PageService } from 'src/app/aws.services/page.aws.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  pageForm!: FormGroup;
  pages$: Observable<Page[]> = this.pageService.pages$;
  sortedPages$: Observable<Page[]> = new Observable<Page[]>;

  articlesByPageId: { [key: string]: string | number } = {};
  createMode: boolean = true;
  selectedPage!: Page;
  // ticked: string = '✔';

  constructor(
    private pageService: PageService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.pages$.subscribe((pages) => {
      pages.forEach(async (page) => {
        const array = await this.pageService.articlesByPageId(page.id);
        this.articlesByPageId[page.label] = array.length ? array.length : '-';

        // console.log('page', page.label, this.articlesByPageId[index].length);
      });
    });

    this.sortedPages$ = this.pages$.pipe(
      map((pages) => pages.sort((a, b) => (a.hidden ? -1 : 1))),
      map((pages) => pages.sort((a, b) => (a.root_menu === b.root_menu ? -1 : 1)))
    );

    this.pageForm = new FormGroup({
      // rank: new FormControl(0, Validators.required),
      label: new FormControl('', Validators.required),
      root_menu: new FormControl('', Validators.required),
      hidden: new FormControl(false),
      // fixed: new FormControl(false),
      description: new FormControl('', Validators.required),
      viewer: new FormControl('', Validators.required),
      // image: new FormControl('', Validators.required),
    });

  }

  get label() { return this.pageForm.get('label')!; }
  get description() { return this.pageForm.get('description')!; }
  get viewer() { return this.pageForm.get('viewer')!; }

  selectPage(page: Page) {
    this.pageForm.patchValue(page);
    this.createMode = false;
    this.selectedPage = page;
  }


  // CR(U)D CATEGORIES


  createPage() {
    console.log('createPage');
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      return;
    }
    this.pageService.createPage(this.pageForm.value);
    this.pageForm.reset();
  }

  updatePage() {
    if (this.pageForm.invalid) {
      this.pageForm.markAllAsTouched();
      return;
    }
    let newPage = this.pageForm.value;
    newPage.id = this.selectedPage.id;
    this.pageService.updatePage(newPage);
    this.pageForm.reset();
    this.createMode = true;
  }


  async deletePage(event: any, page: Page) {
    const articles = await this.pageService.articlesByPageId(page.id);
    if (articles.length > 0) {
      this.toastService.showWarningToast('Page not empty', 'la rubrique n\'est pas vide');
      return
    } else {
      event.stopPropagation();
      this.pageService.deletePage(page);
      this.pageForm.reset();
      this.createMode = true;
    }

  }

  cancel() {
    this.pageForm.reset();
    this.createMode = true;
  }
}

