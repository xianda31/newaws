import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, concatAll, take, filter, tap, toArray } from 'rxjs';
import { CreatePageInput, Page } from 'src/app/API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { environment } from 'src/app/environments/environment';
import { Menu } from 'src/app/interfaces/navigation.interface';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  menuItems!: Map<string, Menu[]>;

  test_links: boolean = environment.test_links;
  loggedusername !: string;
  loggeduserlicence !: string;
  isLogged: boolean = environment.logging_bypass;
  isAdmin: boolean = false;
  isPublisher: boolean = false;
  hasRole: boolean = false;

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

    this.pages$.subscribe((pages) => {
      console.log('constructing new menu map');
      // this.checkMustHavePages(pages);
      this.menuItems = this.buildMenuMap(pages);
    });


    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
      if (user) {
        this.loggedusername = user.username;
        this.loggeduserlicence = user.license;
        this.isLogged = true;

        let member = this.memberService.getMemberByLicense(user.license);
        const rights = member?.rights!;
        this.isAdmin = rights?.includes('Admin');
        this.isPublisher = rights?.includes('Publisher');
        this.hasRole = this.isAdmin || this.isPublisher;
      }
    });
  }

  onLogout() {
    this.cognitoService._signOut();
    this.isLogged = false;
    this.isAdmin = false;
    this.isPublisher = false;
    this.router.navigate(['front/home']);
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
