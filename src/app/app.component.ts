import { Component, OnInit } from '@angular/core';
import { PageService } from './aws.services/page.aws.service';
import { combineLatest, delay } from 'rxjs';
import { MemberService } from './aws.services/member.aws.service';
import { environment } from './environments/environment';
import { ArticleService } from './aws.services/article.aws.service';
import { CognitoService } from './aws.services/cognito.aws.service';
import { User } from 'parse';
import { LoggedUser } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DBloaded: boolean = false;
  test_links: boolean = environment.test_links;
  showSideMenu: boolean = true;
  loggedUser: LoggedUser | null = null;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private memberService: MemberService,
    private cognitoService: CognitoService,

  ) { }
  ngOnInit(): void {

    if (environment.logging_bypass) this.cognitoService.signIn(environment.john_doe);

    combineLatest([this.pageService.pagesReady$,
    this.memberService.members$, this.articleService.articles$])
      .subscribe(([pagesReady, members, articles]) => {
        if (members.length > 0 && pagesReady) {
          this.DBloaded = true;
        }
      });

    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {

      // this.loggedUser = user;

      if (user) {
        let member = this.memberService.getMemberByLicense(user.license);
        this.loggedUser = { email: user.email, firstname: user.username, lastname: member?.lastname, license: user.license, credentials: member?.rights! };
        // const rights = member?.rights!;

      } else {
        this.loggedUser = null;
      }
      console.log('loggedUser: %o', this.loggedUser);
    });

  }

  title = 'bcsto';
}
