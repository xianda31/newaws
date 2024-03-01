import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { APIService, Article, CreatePageInput, Page } from '../API.service';
import { ArticleService } from './article.aws.service';
import { ToastService } from '../toaster/toast.service';
import { Menu } from '../interfaces/navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _pages: Page[] = [];
  pages$: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>(this._pages);
  pagesReady$: Observable<boolean> = this.pages$.pipe(map((pages) => pages.length > 0));

  constructor(
    private api: APIService,
    private articleService: ArticleService,
    private toastService: ToastService,
  ) {

    // READ ALL PAGES

    this.api.ListPages().then((result) => {
      this._pages = result.items as Page[];
      console.log('%s pages identifiées : ', this._pages.length, this._pages);
      this.pages$.next(this._pages);

    }).catch((error) => { console.log('init pages failed !!', error) });

    this.articleService.onUpdateArticle$.subscribe((id) => {
      if (id === '') return;
      // console.log('pageService : an article event...', id);
      this.api.GetPage(id).then((result) => {
        const page = result as Page;
        this._pages = this._pages.map((item) => item.id === page.id ? page : item);
        this.pages$.next(this._pages);
      });
    });

  }



  // C(R)UD PAGES

  createPage(page: Page | CreatePageInput) {

    this.api.CreatePage(page).then((result) => {
      const page = result as Page;
      this._pages.push(page);
      this.pages$.next(this._pages);
    })
      .catch((error) => { console.log('Error creating page %o : err: %o', page, error); });
  }

  sgetPage(id: string): Page {
    return this._pages.find((page) => page.id === id)!;
  }



  updatePage(page: Page, feedback?: boolean) {
    const { articles, createdAt, updatedAt, __typename, ...pageInput } = page;
    this.api.UpdatePage(pageInput).then((result) => {
      this._pages = this._pages.map((item) => item.id === result.id ? result : item);
      this.pages$.next(this._pages);
      if (feedback) {
        this.toastService.showSuccessToast('page service', 'mise à jour page effectuée',);
      }
    })
      .catch((error) => { console.log('Error updating page: ', error); });

  }


  deletePage(page: Page) {
    this.api.DeletePage({ id: page.id }).then((result) => {
      this._pages = this._pages.filter((item) => item.id !== page.id);
      this.pages$.next(this._pages);
    })
      .catch((error) => {
        console.log('Error deleting page: ', error);
      });
  }


  // utilities

  async articlesByPageId(pageId: string): Promise<Article[]> {
    let result = await this.api.ArticlesByPageId(pageId);
    // console.log('articlesByPageId : ', result);
    return result.items as Article[];
  }

  sgetPageByLabel(label: string): Page {
    let page = this._pages.find((page) => page.label === label);
    if (!page) { console.log('page %s not found ... has been replaced by 404', label) }
    return page ? page : this._pages.find((page) => page.label === '404')!;
  }
  sgetPageByPath(path: string): Page | undefined {
    let page = this._pages.find((page) => page.path === path);
    if (!page) { console.log('page %s not found within %o ... has been replaced by 404', path, this._pages) }
    return page;
  }

  generatePath(root_menu: string, label: string): string {
    const count = this._pages.reduce((acc, page) => (page.root_menu === root_menu ? acc + 1 : acc), 0);
    return (count === 1) ? label.toLowerCase().replace(/\s/g, '-') : (root_menu + '/' + label).toLowerCase().replace(/\s/g, '-');
  }

  buildMenu(isLogged: boolean): Map<string, Menu[]> {
    let menuMap = new Map<string, Menu[]>([]);

    this._pages.forEach((page) => {
      if (!isLogged && !page.public) { return; }
      const root = page.root_menu;
      if (page.hidden) { return; }
      const menu = { label: page.label, route_path: page.path, pageId: page.id, page: page };

      if (menuMap.has(root)) {
        let arr = menuMap.get(root)!;
        arr.push(menu);
      } else {
        menuMap.set(root, [menu]);
      };
    });

    // console.log('menuMap: %o', menuMap);
    return menuMap;


  }
}


