import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
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


  constructor(
    private cognitoService: CognitoService,
    private router: Router,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    this.setRights();
  }



  ngOnInit(): void {
    const route = this.router.url;
    this.frontMenuShow = !route.includes('back');
    this.setRights();
  }

  setRights() {

    if (this.loggedUser === null) {
      this.isLogged = false;
    } else {
      this.isLogged = true;
      this.isAdmin = this.loggedUser.credentials?.includes('Admin');
      this.isPublisher = this.loggedUser.credentials?.includes('Publisher');
      this.isSeller = this.loggedUser.credentials?.includes('Seller');
    }
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

}
