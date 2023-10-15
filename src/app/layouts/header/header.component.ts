import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggedusername !: string;
  loggeduserlicence !: string;
  logged: boolean = environment.logging_bypass;

  categories$: Observable<Category[]> = this.categoryService.categories$;
  sortedCategories$: Observable<Category[]> = this.categoryService.categories$.pipe(
    map((categories) => categories.filter((category) => !category.fixed)),
    map((categories) => categories.sort((a, b) => (a.rank - b.rank)))
  );


  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {

    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
      if (user) {
        this.loggedusername = user.username;
        this.loggeduserlicence = user.license;
        this.logged = true;

      }
    });
  }

  onLogout() {
    this.cognitoService._signOut();
    this.logged = false;
    this.router.navigate(['/home']);
  }
}
