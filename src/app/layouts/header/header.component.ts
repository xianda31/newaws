import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { NavigationService } from 'src/app/aws.services/navigation.aws.service';
import { environment } from 'src/app/environments/environment';
import { MenuItem } from 'src/app/interfaces/navigation.interface';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  // menuItems!: MenuItem[];
  menuItems$: Observable<MenuItem[]> = this.navService.siteMenus$;


  test_links: boolean = environment.test_links;
  loggedusername !: string;
  loggeduserlicence !: string;
  isLogged: boolean = environment.logging_bypass;
  isAdmin: boolean = false;
  isPublisher: boolean = false;

  homeMenu!: MenuItem;
  contactMenu!: MenuItem;

  categories$: Observable<Category[]> = this.categoryService.categories$;
  sortedCategories$: Observable<Category[]> = this.categoryService.categories$.pipe(
    map((categories) => categories.filter((category) => !category.fixed)),
    map((categories) => categories.sort((a, b) => (a.rank - b.rank)))
  );


  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private categoryService: CategoryService,
    private memberService: MemberService,
    private navService: NavigationService
  ) { }
  ngOnInit(): void {

    // this.navService.loadSiteMenu;
    this.homeMenu = this.navService.getMandatoryItem('Home');



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
