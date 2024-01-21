import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Page } from 'src/app/API.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {




  constructor(
    private router: Router,
    private pageService: PageService,
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {
  }

}
