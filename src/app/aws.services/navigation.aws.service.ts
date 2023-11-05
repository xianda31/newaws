import { Injectable } from '@angular/core';
import { MenuItem, Page } from '../interfaces/navigation.interface';
import { BehaviorSubject } from 'rxjs';
import { _compDirectory } from '../app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  SiteMenus: MenuItem[] = [];
  siteMenus$: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>([]);
  _components = _compDirectory;


  constructor() {
    const timeout = setTimeout(() => {
      this.loadSiteMenu();
      this.siteMenus$.next(this.SiteMenus);
    }, 1000);
  }

  _mustHavePages: Page[] = [
    { id: 'xx', title: 'Home', description: 'blablabla', componentId: 'single', param: 'Accueil' },
    { id: 'a', title: 'Contact', description: 'blablabla', componentId: 'single', param: 'Contact' },
    { id: 'zz', title: 'Légal', description: 'blablabla', componentId: 'single', param: 'Légal' },
  ]

  _pages: Page[] = [
    // { id: 'legal', title: 'Légal', description:'blablabla', componentId: 'single', param: 'Légal' },
    { id: 'b', title: 'La une', description: 'blablabla', componentId: "board", param: 'La une' },
    { id: 'p1', title: 'Initiation', description: 'blablabla', componentId: "board", param: 'Initiation' },
    { id: 'p2', title: 'Perfect.', description: 'blablabla', componentId: "board", param: 'Perfectionnement' },
    { id: 'c', title: 'Links', description: 'blablabla', componentId: "links" },
    { id: 'todo', title: 'todoo', description: 'blablabla', componentId: "todo" },
  ];

  _menuItems: MenuItem[] = [
    { endItem: true, label: 'La une', pageId: 'b' },
    {
      endItem: false, label: 'Tournois', subItems: [
        { endItem: true, label: 'Horaires', pageId: 'todo' },
        { endItem: true, label: 'Informations', pageId: 'todo' },
      ]
    },
    { endItem: true, label: 'Links', pageId: 'c' },
    {
      endItem: false, label: 'Ecole de Bridge', subItems: [
        { endItem: true, label: 'Initiation', pageId: 'p1' },
        { endItem: true, label: 'Perfectionnement', pageId: 'p2' },
        { endItem: true, label: 'Autre', pageId: 'todo' },
      ]
    },
    {
      endItem: false, label: 'Le Club', subItems: [
        { endItem: true, label: 'Les acteurs du Club', pageId: 'todo' },
        { endItem: true, label: 'Tarifs', pageId: 'todo' },
        { endItem: true, label: 'Status et règlements', pageId: 'todo' },
      ]
    },
    { endItem: true, label: 'Photos', pageId: 'todo' },


  ];

  getMandatoryItem(title: 'Home' | 'Contact' | 'Légal'): MenuItem {
    let menuItem: MenuItem = { endItem: true, label: title };
    let page = this._mustHavePages.find((page) => page.title === title);
    page = page ? page : { id: 'xx', title: '404', description: 'blablabla', componentId: '404' };
    let component = this._components[page.componentId];
    let strippedPath = this.stripParameter(component.path!);
    menuItem.routerLink = strippedPath;
    menuItem.page_param = page.param;
    return menuItem;
  }



  stripParameter(path: string) {
    return path.split('/:')[0];
  }

  updateEndMenu(menuItem: MenuItem, push: boolean) {
    if (menuItem.endItem) {
      let page = this._pages.find((page) => page.id === menuItem.pageId);
      if (page) {
        let component = this._components[page.componentId];
        let strippedPath = this.stripParameter(component.path!);
        menuItem.routerLink = strippedPath;
        menuItem.page_param = page.param;
        if (push) { this.SiteMenus.push(menuItem); }
      }
    } else {
      this.SiteMenus.push(menuItem);
      if (menuItem.subItems) {

        menuItem.subItems.forEach((subItem) => {

          this.updateEndMenu(subItem, false);
        });
      }
    }
  }

  loadSiteMenu() {
    this._menuItems.forEach((menuItem) => {
      this.updateEndMenu(menuItem, true);
    });
  }

}
