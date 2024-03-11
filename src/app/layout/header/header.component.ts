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

  isLogged!: boolean;
  isAdmin!: boolean;
  isPublisher!: boolean;
  isSeller!: boolean;

  constructor(
    private cognitoService: CognitoService,
    private router: Router,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loggedUser'].isFirstChange()) return;
    // console.log('HeaderComponent : ngOnChanges : loggedUser changed : ', this.loggedUser);
    this.setRights();
  }



  ngOnInit(): void {
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
    // console.log('this.isLogged : ', this.isLogged, this.isAdmin, this.isPublisher, this.isSeller);
  }


  onLogout() {
    this.cognitoService._signOut();
    this.isLogged = false;
    this.isAdmin = false;
    this.isPublisher = false;
    this.router.navigate(['home']);
  }


}
