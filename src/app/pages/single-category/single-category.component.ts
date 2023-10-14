import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';
import { Storage } from 'aws-amplify/lib-esm';


@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  @Input('cat') categoryLabel!: string;// @RouteParam()
  @Input('aid') articleId!: string;// @RouteParam()


  articles$: Observable<Article[]> = this.articleService.articles$;
  filteredArticles$: Observable<Article[]> = this.articleService.articles$;
  articles: Article[] = [];
  authenticatedUser: boolean = false;
  selectedCategory!: Category;
  selectedArticle!: Article;
  categoryId!: string;
  HTMLstring!: string;


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private cognitoService: CognitoService

  ) { }


  async ngOnInit(): Promise<void> {


    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
      this.authenticatedUser = user ? true : false;
    });

    this.selectedCategory = this.categoryService.getCategoryByLabel(this.categoryLabel);
    console.log('articleId :', this.articleId);
    this.articles$.pipe(
      map((articles) => articles.filter((article) => article.categoryId === this.selectedCategory.id)),
      map((articles) => articles.sort((a, b) => ((a.createdAt > b.createdAt) || (a.id === this.articleId) ? -1 : 1))),
      map((articles) => articles.sort((a, b) => ((a.id === this.articleId) && b.id ? -1 : 1))),
      tap((articles) =>
        this.selectedArticle = this.articleId ? articles.find((article) => (article.id === this.articleId))! : articles[0])
    ).subscribe(async (articles) => {
      console.log('articles :', articles);
      if (articles.length !== 0) {

        this.articles = articles;
        const blob = await Storage.get('articles/' + this.selectedArticle.permalink, { download: true });
        // console.log('blob :', blob);
        blob.Body?.text()
          .then((text) => {
            this.HTMLstring = text;
          }

          );
      }
    }
    );



  }

  async selectArticle(article: Article) {
    this.selectedArticle = article;
    const blob = await Storage.get('articles/' + this.selectedArticle.permalink, { download: true });
    // console.log('blob :', blob);
    blob.Body?.text()
      .then((text) => {
        this.HTMLstring = text;
      }

      );
    // console.log('selectedArticle', this.selectedArticle.id);
  }
}



