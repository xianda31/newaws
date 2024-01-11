import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, concatAll, take, filter, tap, toArray } from 'rxjs';
import { CreatePageInput, Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { Menu } from 'src/app/interfaces/navigation.interface';
import { LoggedUser } from 'src/app/interfaces/user.interface';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() loggedUser!: LoggedUser | null;

  frontMenuShow: boolean = true;

  isAdmin: boolean = true;
  isPublisher: boolean = true;
  isSeller: boolean = true;

  menuItems!: Map<string, Menu[]>;
  // test_links: boolean = environment.test_links;

  pages$: Observable<Page[]> = this.pageService.pages$;


  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private pageService: PageService,
    private memberService: MemberService,
  ) { }

  get menuKeys() {
    return Array.from(this.menuItems.keys());
  }
  get menuValues() {
    return Array.from(this.menuItems.values());
  }


  ngOnInit(): void {

    const route = this.router.url;
    this.frontMenuShow = !route.includes('back');

    this.pages$.subscribe((pages) => {
      this.menuItems = this.buildMenuMap(pages);
    });

    console.log('loggedUser: %o', this.loggedUser);

  }

  onLogout() {
    this.cognitoService._signOut();
    // this.isLogged = false;
    // this.isAdmin = false;
    // this.isPublisher = false;
    this.router.navigate(['front/home']);
  }


  toggleFrontMenuVisibility() {
    this.frontMenuShow = !this.frontMenuShow;
    if (!this.frontMenuShow) {
      this.router.navigate(['back']);
    } else {
      this.router.navigate(['front/home']);
    }
  }
  // menu utilities



  buildMenuMap(pages: Page[]): Map<string, Menu[]> {
    let menuMap = new Map<string, Menu[]>([]);

    pages.forEach((page) => {
      const root = page.root_menu;
      if (page.hidden) { return; }
      const menu = { label: page.label, route_path: 'front/' + page.path, pageId: page.id, page: page };

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
