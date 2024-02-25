import { Component, OnInit } from '@angular/core';
import { PageService } from './aws.services/page.aws.service';
import { combineLatest, delay } from 'rxjs';
import { MemberService } from './aws.services/member.aws.service';
import { environment } from '../environments/environment';
import { ArticleService } from './aws.services/article.aws.service';
import { CognitoService } from './aws.services/cognito.aws.service';
import { User } from 'parse';
// import { LoggedUser } from './interfaces/user.interface';
import { FileService } from './shared/service/file.service';
import { LoggedUser } from './interfaces/user.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DBloaded: boolean = false;
  showSideMenu: boolean = true;
  loggedUser: LoggedUser | null = null;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private memberService: MemberService,
    private cognitoService: CognitoService,
    private fileService: FileService

  ) { }
  ngOnInit(): void {

    // if (!environment.logging_bypass) this.cognitoService.signIn({ email: environment.john_doe.email, password: environment.john_doe.password });

    combineLatest([
      this.memberService.members$,
      this.pageService.pagesReady$,
      this.articleService.articles$,
      this.fileService.bucketLoaded$,
      this.cognitoService.currentAuthenticatedUser$])
      .subscribe(([members, pagesReady, articles, bucketLoaded, user]) => {

        if (members.length > 0 && pagesReady && bucketLoaded) {
          // console.log('user : ', user);

          if (user !== null) {
            let member = this.memberService.getMemberByLicense(user.license)!;
            this.loggedUser = { email: user.email, firstname: user.username, lastname: member.lastname, license: user.license, credentials: member?.rights! };
          } else {
            this.loggedUser = null;
          }
          this.DBloaded = true;
        }
      });
  }

  title = 'bcsto';
}
