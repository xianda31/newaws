import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';


@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<Article[]> = this.articleService.articles$;
  bannerURL!: any;
  articles: Article[] = [];

  articlesDBloaded: boolean = false;
  constructor(
    private articleService: ArticleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.bannerURL = new Map<string, string>();

    this.articles$.subscribe((articles) => {
      this.articles = articles;
      // console.log('%s articles', articles.length, articles);
      {
        articles.forEach((article) => {
          Storage.get('banners/' + article.banner, { validateObjectExistence: true }).then((signedURL) => {

            this.bannerURL.set(article.permalink, signedURL);
          })
            .catch((error) => {
              console.log('error', error);
            })
        });
        this.articlesDBloaded = true;
      }
    });

  };

  getBannerURL(article: Article) {
    return this.bannerURL.get(article.permalink);
  }

  onDelete(article: Article) {
    this.articleService.deleteArticle(article);
  }

  onPublish(article: Article) {
    const { category, createdAt, updatedAt, __typename, ...articleInput } = article;
    this.articleService.updateArticle(articleInput);
  }

  onUpdate(article: Article) {
    this.router.navigate(['dashboard/articles', article.id]);
  }

  onCreate() {
    this.router.navigate(['dashboard/articles', 'new']);
  }
}
