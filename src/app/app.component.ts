import { Component, OnInit } from '@angular/core';
import { PageService } from './aws.services/page.aws.service';
import { combineLatest, delay } from 'rxjs';
import { MemberService } from './aws.services/member.aws.service';
import { environment } from './environments/environment';
import { ArticleService } from './aws.services/article.aws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  DBloaded: boolean = false;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private memberService: MemberService,
  ) { }
  ngOnInit(): void {


    combineLatest([this.pageService.pagesReady$,
    this.memberService.members$, this.articleService.articles$])
      .subscribe(([pagesReady, members, articles]) => {
        if (members.length > 0 && pagesReady) {
          this.DBloaded = true;
        }
      });
  }

  title = 'bcsto';
}
