import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Page } from 'src/app/API.service';
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
  menuItems$: Observable<Map<string, Menu[]>> = this.pageService.siteMenus$;


  test_links: boolean = environment.test_links;
  loggedusername !: string;
  loggeduserlicence !: string;
  isLogged: boolean = environment.logging_bypass;
  isAdmin: boolean = false;
  isPublisher: boolean = false;

  homeMenu!: Menu;
  contactMenu!: Menu;

  page$: Observable<Page[]> = this.pageService.pages$;
  sortedCategories$: Observable<Page[]> = this.pageService.pages$.pipe(
    // map((page) => page.filter((page) => !page.fixed)),
    // map((page) => page.sort((a, b) => (a.rank - b.rank)))
  );


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

    this.homeMenu = this.pageService.getMandatoryItem('Home');

    this.pageService.siteMenus$.subscribe((menus) => {
      this.menuItems = menus;
    });

    // this.navService.loadSiteMenu;



    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
      if (user) {

        this.loggedusername = user.username;
        this.loggeduserlicence = user.license;
        this.isLogged = true;

        let member = this.memberService.getMemberByLicense(user.license);
        const rights = member?.rights!;
        this.isAdmin = rights?.includes('Admin');
        this.isPublisher = rights?.includes('Publisher');

      }
    });
  }

  onLogout() {
    this.cognitoService._signOut();
    this.isLogged = false;
    this.isAdmin = false;
    this.isPublisher = false;
    this.router.navigate(['/home']);
  }
}
