import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, map, combineLatest, BehaviorSubject } from 'rxjs';
import { Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})



export class DynamicMenuComponent implements OnChanges {

  @Input() isLogged: boolean = false;
  _isLogged$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  menuMap$: Observable<Map<string, Menu[]>> = combineLatest([
    this._isLogged$,
    this.pageService.pages$
  ]).pipe(
    map(([logged, pages]) => this.pageService.buildMenu(logged))
  );


  constructor(
    private pageService: PageService,
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isLogged'].isFirstChange()) return;
    // console.log('DynamicMenuComponent : rebuilding menu : ', this.isLogged);
    this._isLogged$.next(this.isLogged);
  }


  strip_order(root: string): string {
    return root.replace(/^\w\#/g, '');
  }


}
