import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { APIService, Article, CreatePageInput, Page } from '../API.service';
import { Menu } from '../interfaces/navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  private _pages: Page[] = [];
  pages$: BehaviorSubject<Page[]> = new BehaviorSubject<Page[]>(this._pages);
  siteMenus: Map<string, Menu[]> = new Map<string, Menu[]>([]);
  siteMenus$: BehaviorSubject<Map<string, Menu[]>> = new BehaviorSubject<Map<string, Menu[]>>(this.siteMenus);


  constructor(
    private api: APIService,
  ) {

    // READ ALL CATEGORIES

    this.api.ListPages().then((result) => {
      this._pages = result.items as Page[];
      console.log('%s pages identifiées : ', this._pages.length, this._pages);
      this.checkMustHavePages();
      this.siteMenus$.next(this.buildMenuMap());
      this.pages$.next(this._pages);

    })
      .catch((error) => { console.log('init pages failed !!', error) });

  }

  // get pages$(): Observable<Page[]> {
  //   return this.pages$ as Observable<Page[]>;
  // }



  // C(R)UD CATEGORIES


  createPage(page: Page) {

    this.api.CreatePage(page).then((result) => {
      const page = result as Page;
      this._pages.push(page);
      this.pages$.next(this._pages);
    })
      .catch((error) => { console.log('Error creating page: ', error); });
  }

  // async agetPage(id: string): Promise<any> {
  //   return this.api.GetPage(id);
  // }

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
  sgetPageByPath(path: string): Page {
    let page = this._pages.find((page) => page.path === path);
    if (!page) { console.log('page %s not found ... has been replaced by 404', path) }
    return page ? page : this._pages.find((page) => page.path === '404')!;
  }

  // menu utilities

  // _components = _compDirectory;

  _mustHavePages: CreatePageInput[] = [
    { root_menu: 'Home', hidden: true, label: 'accueil', description: 'blablabla', path: 'home' },
    { root_menu: 'Contact', hidden: true, label: 'contact', description: 'blablabla', path: 'contact' },
    { root_menu: 'Legal', hidden: true, label: 'légal', description: 'la loi la loi', path: 'legal' },
    // { root_menu: '404', hidden: true, label: '404', description: 'blablabla', path: 'notfound' },
  ]

  checkMustHavePages() {

    this._mustHavePages.forEach((item) => {
      if (!this._pages.find((page) => page.root_menu === item.root_menu)) {
        // console.log('page %s not found ... has been created', item.root_menu);
        const page = this.api.CreatePage(item);
        page.then((result) => {
          // console.log('page  created: %o', result);
          this.pages$.next([...this.pages$.getValue(), result])
        })
      } else {
        console.log('page %s found', item.root_menu);
      }
    })

  }

  // stripParameter(path: string) {
  //   return path.split('/:')[0];
  // }


  buildMenu(pageId: string): Menu {
    let menu!: Menu;
    let page = this._pages.find((page) => page.id === pageId);
    if (!page) {
      console.log('page %s not found', pageId);
      // menu = this.getMandatoryItem('404');
      return menu;
    }
    menu = { label: page.label, route_path: 'front/' + page.path, pageId: page.id, page: page };
    // }

    return menu;
  }

  buildMenuMap(): Map<string, Menu[]> {
    let menuMap = new Map<string, Menu[]>([]);

    this._pages.forEach((page) => {
      const root = page.root_menu;
      if (page.hidden) { return; }
      if (menuMap.has(root)) {
        let arr = menuMap.get(root)!;
        arr.push(this.buildMenu(page.id));
        // menuMap.set(root, arr);   // pas nécessaire car arr est une référence
      } else {
        menuMap.set(root, [this.buildMenu(page.id)]);
      };
    });

    console.log('menuMap: %o', menuMap);
    return menuMap;


  }
}


