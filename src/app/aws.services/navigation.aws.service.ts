import { Injectable } from '@angular/core';
import { Menu, Page, oldPage } from '../interfaces/navigation.interface';
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
    { id: 'xx', nav: 'Home', title: 'Home', description: 'blablabla', componentId: 'single', param: 'Accueil' },
    { id: 'a', nav: 'Contact', title: 'Contact', description: 'blablabla', componentId: 'single', param: 'Contact' },
    { id: 'zz', nav: 'Legal', title: 'Légal', description: 'blablabla', componentId: 'single', param: 'Légal' },
  ]

  _pages: Page[] = [
    { id: 'b', nav: 'La une', title: 'La une', description: 'blablabla', componentId: "board", param: 'La une' },
    { id: 'p1', nav: 'Ecole de Bridge', title: 'Initiation', description: 'blablabla', componentId: "board", param: 'Initiation' },
    { id: 'p2', nav: 'Ecole de Bridge', title: 'Perfectionnement', description: 'blablabla', componentId: "board", param: 'Perfectionnement' },
    { id: 'c', nav: 'Links', title: 'Links', description: 'blablabla', componentId: "links", param: null },
    { id: 'todoA', nav: 'todo', title: 'todooA', description: 'blablabla', componentId: "todo", param: null },
    { id: 'todoB', nav: 'todo', title: 'todooB', description: 'blablabla', componentId: "todo", param: null },
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


  getMandatoryItem(title: 'Home' | 'Contact' | 'Légal'): Menu {
    let menu!: Menu;
    let page = this._mustHavePages.find((page) => page.title === title);
    if (!page) { return { label: '404', pageId: 'xx' }; }
    let component = this._components[page.componentId];
    let strippedPath = this.stripParameter(component.path!);
    page.route_path = strippedPath;
    menu = { label: page.title, pageId: page.id, page: page };
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
      let component = this._components[page.componentId];
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
