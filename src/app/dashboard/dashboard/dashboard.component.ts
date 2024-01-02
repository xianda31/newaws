import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/API.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { environment } from 'src/app/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  test_links: boolean = environment.test_links;
  loggedusername !: string;
  loggeduserlicence !: string;
  isLogged: boolean = environment.logging_bypass;
  isAdmin: boolean = false;
  isPublisher: boolean = false;



  constructor(
    private cognitoService: CognitoService,
    private router: Router,
    private pageService: PageService,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {



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

}
