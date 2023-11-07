import { Injectable } from '@angular/core';
import { Menu, Page } from '../interfaces/navigation.interface';
import { BehaviorSubject } from 'rxjs';
import { _compDirectory } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  siteMenus: Map<string, Menu[]> = new Map<string, Menu[]>([]);
  siteMenus$: BehaviorSubject<Map<string, Menu[]>> = new BehaviorSubject<Map<string, Menu[]>>(this.siteMenus);
  _components = _compDirectory;

  _mustHavePages: Page[] = [
    { id: 'xx', nav: 'Home', title: 'Accueil', description: 'blablabla', viewer: 'viewer' },
    { id: 'a', nav: 'Contact', title: 'Contact', description: 'blablabla', viewer: 'viewer' },
    { id: 'zz', nav: 'Legal', title: 'Légal', description: 'blablabla', viewer: 'viewer' },
  ]

  _pages: Page[] = [
    { id: 'b', nav: 'La une', title: 'La une', description: 'les dernières informations', viewer: 'viewer' },
    { id: 'p1', nav: 'Ecole de Bridge', title: 'Initiation', description: 'blablabla', viewer: 'viewer' },
    { id: 'p2', nav: 'Ecole de Bridge', title: 'Perfectionnement', description: 'perf | go', viewer: 'viewer' },
    // { id: 'c', nav: 'Links', title: 'Links', description: 'blablabla', viewer: "links" },
    { id: 'todoA', nav: 'Le Club', title: 'Les acteurs du Club', description: 'saison 2023-24', viewer: "todo" },
    { id: 'todoB', nav: 'Le Club', title: 'Tarifs', description: 'saison 2023-24', viewer: "todo" },
    { id: 'todoC', nav: 'Le Club', title: 'Status et règlements', description: '', viewer: "todo" },

  ];


  constructor() {

    const timeout = setTimeout(() => {
      ;
      this.siteMenus$.next(this.buildMenuMap());
    }, 1000);
  }



  // _menus: Map<string, Menu[]> = new Map<string, Menu[]>([
  //   ["La une", [{ label: 'La une', pageId: 'b' }]],
  //   ["Tournois", [
  //     { label: 'Horaires', pageId: 'todo' },
  //     { label: 'Informations', pageId: 'todo' },
  //   ]],
  //   ["Links", [{ label: 'Links', pageId: 'c' }]],
  //   ["Ecole de Bridge", [
  //     { label: 'Initiation', pageId: 'p1' },
  //     { label: 'Perfectionnement', pageId: 'p2' },
  //     { label: 'Autre', pageId: 'todo' },
  //   ]],
  //   ["Le Club", [
  //     { label: 'Les acteurs du Club', pageId: 'todo' },
  //     { label: 'Tarifs', pageId: 'todo' },
  //     { label: 'Status et règlements', pageId: 'todo' },
  //   ]],
  //   ["Photos", [{ label: 'Photos', pageId: 'todo' }]],


  // ]);


  getMandatoryItem(nav: 'Home' | 'Contact' | 'Legal'): Menu {
    let menu!: Menu;
    let page = this._mustHavePages.find((page) => page.nav === nav);
    if (!page) { return { label: '404', pageId: 'xx' }; }
    let component = this._components[page.viewer];
    let strippedPath = this.stripParameter(component.path!);
    page.route_path = strippedPath;
    menu = { label: page.nav, pageId: page.id, page: page };
    return menu;
  }

  stripParameter(path: string) {
    return path.split('/:')[0];
  }

  buildMenu(pageId: string): Menu {
    let menu!: Menu;
    let page = this._pages.find((page) => page.id === pageId);
    if (!page) {
      console.log('page %s not found', pageId);
      menu = { label: '404', pageId: '404', page: this._components['404'] };
    } else {
      let component = this._components[page.viewer];
      let strippedPath = this.stripParameter(component.path!);
      page.route_path = strippedPath;
      menu = { label: page.title, pageId: page.id, page: page };
    }
    return menu;
  }

  buildMenuMap(): Map<string, Menu[]> {
    let menuMap = new Map<string, Menu[]>([]);

    this._pages.forEach((page) => {
      const root = page.nav;
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
