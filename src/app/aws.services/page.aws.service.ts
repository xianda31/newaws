import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { APIService, Article, CreatePageInput, Page } from '../API.service';
import { Menu } from '../interfaces/navigation.interface';
import { _compDirectory } from '../app-routing.module';

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
    this.api.UpdatePage(page).then((result) => {
      this._pages = this._pages.map((cat) => cat.id === page.id ? page : cat);
      this.pages$.next(this._pages);
    })
      .catch((error) => { console.log('Error updating page: ', error); });

  }


  deletePage(page: Page) {
    this.api.DeletePage({ id: page.id }).then((result) => {
      this._pages = this._pages.filter((cat) => cat.id !== page.id);
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

  getPageByLabel(label: string): Page {
    return this._pages.find((page) => page.label === label)!;
  }


  // menu utilities

  _components = _compDirectory;

  _mustHavePages: CreatePageInput[] = [
    { root_menu: 'Home', hidden: true, label: 'Accueil', description: 'blablabla', viewer: 'viewer' },
    { root_menu: 'Contact', hidden: true, label: 'Contact', description: 'blablabla', viewer: 'viewer' },
    { root_menu: 'Legal', hidden: true, label: 'Légal', description: 'la loi la loi', viewer: 'viewer' },
    { root_menu: '404', hidden: true, label: '404', description: 'blablabla', viewer: 'viewer' },
  ]

  checkMustHavePages() {
    let mustHavePages = this._pages.filter((page) => page.root_menu === 'Home' || page.root_menu === 'Contact' || page.root_menu === 'Legal' || page.root_menu === '404');
    this._mustHavePages.forEach((item) => {
      if (!mustHavePages.find((page) => page.root_menu === item.root_menu)) {
        console.log('page %s not found ... has been created', item.root_menu);
        this.api.CreatePage(item);
      }
    });

  }

  stripParameter(path: string) {
    return path.split('/:')[0];
  }

  getMandatoryItem(root_menu: 'Home' | 'Contact' | 'Legal' | '404'): Menu {
    let menu!: Menu;
    let page = this._pages.find((page) => page.root_menu === root_menu);
    page = page ?? this._components['404'];
    let component = this._components[page!.viewer];
    if (!component) {
      console.log('component %s not found', page!.viewer);
      menu = this.getMandatoryItem('404');
      return menu;
    }
    let strippedPath = this.stripParameter(component.path);

    // console.log('strippedPath for %s : %s', root_menu, strippedPath);
    // page.route_path = strippedPath;
    menu = { label: page!.root_menu, route_path: strippedPath, pageId: page!.id, page: page };
    return menu;
  }

  buildMenu(pageId: string): Menu {
    let menu!: Menu;
    let page = this._pages.find((page) => page.id === pageId);
    if (!page) {
      console.log('page %s not found', pageId);
      // menu = this.getMandatoryItem('404');
    } else {
      let component = this._components[page.viewer];
      if (!component) {
        console.log('component %s not found', page.viewer);
        menu = this.getMandatoryItem('404');
      } else {
        let strippedPath = this.stripParameter(component.path!);
        // page.route_path = strippedPath;
        menu = { label: page.label, route_path: strippedPath, pageId: page.id, page: page };
      }
    }
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


