import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/API.service';
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
export class HeaderComponent implements OnInit, OnChanges {
  @Input() loggedUser!: LoggedUser | null;

  frontMenuShow: boolean = true;
  front_url: string = 'front/home';
  back_url: string = 'back';
  isLogged!: boolean;
  isAdmin!: boolean;
  isPublisher!: boolean;
  isSeller!: boolean;



  menuItems!: Map<string, Menu[]>;

  pages$: Observable<Page[]> = this.pageService.pages$;
  private _pages: Page[] = [];



  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private pageService: PageService,
    private memberService: MemberService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedUser']) {
      this.isLogged = this.setRights(this.loggedUser);
      if (this.isLogged) {
        this.menuItems = this.buildMenuMap(this._pages);
      }
    }
  }

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
      this._pages = pages;
      this.menuItems = this.buildMenuMap(this._pages);
    });
    this.isLogged = this.setRights(this.loggedUser!);
  }

  setRights(user: LoggedUser | null): boolean {
    if (user === null) { return false }
    this.isAdmin = user.credentials?.includes('Admin');
    this.isPublisher = user.credentials?.includes('Publisher');
    this.isSeller = user.credentials?.includes('Seller');
    return true;
  }

  onLogout() {
    this.cognitoService._signOut();
    this.isLogged = false;
    this.isAdmin = false;
    this.isPublisher = false;
    this.router.navigate(['front/home']);
  }


  toggleFrontMenuVisibility() {
    this.frontMenuShow = !this.frontMenuShow;
    if (!this.frontMenuShow) {
      this.front_url = this.router.url;
      // console.log('leaving front', this.front_url)
      this.router.navigate([this.back_url]);
    } else {
      this.back_url = this.router.url;
      // console.log('returning to front', this.front_url)
      this.router.navigate([this.front_url]);
    }
  }
  // menu utilities

  stripOrder(root: string): string {
    return root.replace(/^\w\#/g, '');
  }

  buildMenuMap(pages: Page[]): Map<string, Menu[]> {
    let menuMap = new Map<string, Menu[]>([]);

    pages.forEach((page) => {
      if (!this.isLogged && !page.public) { return; }
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
