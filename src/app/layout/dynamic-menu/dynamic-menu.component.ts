import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})



export class DynamicMenuComponent {

  @Input() isLogged: boolean = false;


  menuMap$: Observable<Map<string, Menu[]>> = this.pageService.pages$.pipe(
    map((pages) => this.pageService.buildMenu(this.isLogged)));


  constructor(
    private pageService: PageService,
  ) { }


  stripOrder(root: string): string {
    return root.replace(/^\w\#/g, '');
  }
}
