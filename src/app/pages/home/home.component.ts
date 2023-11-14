import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, concatAll, filter, map, take } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { Menu } from 'src/app/interfaces/navigation.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  article$!: Observable<Article[]>;
  authenticatedUser: boolean = false;
  homePage!: Page;
  pages$: Observable<Page[]> = this.pageService.pages$;




  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private router: Router

  ) { }

  ngOnInit(): void {



    this.pages$.pipe(
      concatAll(),
      filter(page => (page.label === 'Home')),
      take(1)
    ).subscribe((page) => {
      console.log('home Page found :', page);
      if (page) this.homePage = page;
      this.router.navigate(['front', this.homePage.id]);
    });


  }

}
