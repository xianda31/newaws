import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { ToastService } from 'src/app/tools/service/toast.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { Router } from '@angular/router';
import { pageViewIcons } from 'src/app/interfaces/page.interface';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {


  pageForm!: FormGroup;
  // pages$: Observable<Page[]> = this.pageService.pages$;
  pages$: Observable<Page[]> = this.pageService.pages$.pipe(
    map((pages) => pages.sort((a, b) => (a.root_menu < b.root_menu ? -1 : 1))),
    map((pages) => pages.sort((a, b) => (a.hidden ? -1 : 1))),
  );

  // articlesByPageId: { [key: string]: string | number } = {};
  viewIcons: { [key: string]: string } = pageViewIcons;
  pagesByRootMenu: { [key: string]: number } = {};
  createMode: boolean = true;
  selectedPage!: Page;
  // ticked: string = '✔';

  constructor(
    private pageService: PageService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.pages$.subscribe((pages) => {
      this.pagesByRootMenu = {};
      pages.forEach((page) => {
        this.pagesByRootMenu[page.root_menu] = this.pagesByRootMenu[page.root_menu] ? this.pagesByRootMenu[page.root_menu] + 1 : 1;
      });

      this.verifyPath(pages);     // correction des paths menu vs sous-menus
    });


    // initialisation du formulaire
    this.pageForm = new FormGroup({
      root_menu: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      hidden: new FormControl(false),
      description: new FormControl('', Validators.required),
      path: new FormControl('tbd'),
      viewer: new FormControl(''),
      public: new FormControl(true),
    });

  }

  // verification des paths menu vs sous-menus
  verifyPath(pages: Page[]) {

    pages.forEach((page) => {
      const { articles, ...pageWithoutArticles } = page;
      const root = (this.pagesByRootMenu[page.root_menu] === 1) ? '' : page.root_menu + '/';
      const shouldPath = (root + page.label).toLowerCase().replace(/\s/g, '-');
      if (page.path !== shouldPath) {
        // console.log('page', page.label, 'path', page.path, 'should be', shouldPath);
        pageWithoutArticles.path = shouldPath;
        // console.log('correcting  page', pageWithoutArticles);
        this.pageService.updatePage(pageWithoutArticles as Page);
      }
    });
  }



  get label() { return this.pageForm.get('label')!; }
  get description() { return this.pageForm.get('description')!; }
  get path() { return this.pageForm.get('path')!; }
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
    let newPage: Page = this.pageForm.value;
    newPage.hidden = false;
    newPage.path = (this.pagesByRootMenu[newPage.root_menu] === 1) ? newPage.label.toLowerCase().replace(/\s/g, '-') : (newPage.root_menu + '/' + newPage.label).toLowerCase().replace(/\s/g, '-');
    this.pageService.createPage(newPage);
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

  editPage(page: Page) {
    // this.selectPage(page);
    this.router.navigate(['back/publisher/pages', page.id]);
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

  toggle(page: Page) {
    // console.log('toggle', page.public);
    this.pageService.updatePage(page);
  }
}

