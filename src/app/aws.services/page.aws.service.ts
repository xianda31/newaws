import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { APIService, Article, CreatePageInput, Page } from '../API.service';
import { Menu } from '../interfaces/navigation.interface';
import { CanActivateFn } from '@angular/router';
import { ArticleService } from './article.aws.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _pages: Page[] = [];
  pages$: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>(this._pages);
  pagesReady$: Observable<boolean> = this.pages$.pipe(map((pages) => pages.length > 0),
    tap((pagesReady) => console.log('pagesReady : ', pagesReady)));


  constructor(
    private api: APIService,
    private articleService: ArticleService,
  ) {

    // READ ALL PAGES

    this.api.ListPages().then((result) => {
      this._pages = result.items as Page[];
      console.log('%s pages identifiées : ', this._pages.length, this._pages);
      this.pages$.next(this._pages);

    })
      .catch((error) => { console.log('init pages failed !!', error) });

    this.articleService.onUpdateArticle$.subscribe((id) => {
      if (id === '') return;
      // console.log('articleService : pictures of articleid %s changed...');
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



  updatePage(page: Page) {
    const { articles, createdAt, updatedAt, __typename, ...pageInput } = page;
    this.api.UpdatePage(pageInput).then((result) => {
      this._pages = this._pages.map((item) => item.id === page.id ? page : item);
      this.pages$.next(this._pages);
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

}


