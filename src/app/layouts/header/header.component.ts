import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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

  username !: string;
  userlicence !: string;
  logged: boolean = environment.logging_bypass;

  categories$: Observable<Category[]> = this.categoryService.categories$;


  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private categoryService: CategoryService
  ) { }
  ngOnInit(): void {

    this.cognitoService.userLoggedIn.subscribe((userLoggedIn) => {
      if (userLoggedIn) {
        this.cognitoService._getUserInfo().then((user) => {
          console.log('user : ', user.attributes);
          this.username = user.attributes.name;
          this.userlicence = user.attributes['custom:license'];
          this.logged = true;


        }
        ).catch((error) => {
          console.log('getUser error : ', error);
        });
      } else {
        this.username = '';
        this.userlicence = '';
        console.log("anonymous access ...")
      }
    });

  }


  onLogout() {
    // console.log('logout');
    this.cognitoService._signOut();
    this.cognitoService.userLogged(false);
    this.logged = false;
    this.router.navigate(['/home']);
  }
}
