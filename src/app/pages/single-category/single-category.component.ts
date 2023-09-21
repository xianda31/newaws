import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { CognitoService } from 'src/app/aws.services/cognito.aws.service';


@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  articles$: Observable<Article[]> = this.articleService.articles$;
  selectedCategory!: Category;
  featured = false;     // true su filtrage sur page A la une
  articles: Article[] = [];
  authenticatedUser: boolean = false;

  FeaturedCategory: Category = {
    id: '',
    __typename: 'Category',
    label: 'BCSTO',
    description: 'L\'actualité du Bridge Club de Saint-Orens',
    createdAt: '',
    updatedAt: ''
  }


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private cognitoService: CognitoService

  ) { }


  ngOnInit(): void {

    this.cognitoService.currentAuthenticatedUser.subscribe((user) => {
      this.authenticatedUser = user ? true : false;
    });

    this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (paramMap.get('id')) {
          const id = paramMap.get('id')!;

          this.selectedCategory = await this.categoryService.getCategory(id);
          if (this.selectedCategory.articles!.items) {
            this.articles = this.selectedCategory.articles!.items as Article[];
            this.articles = this.articles.filter((article) => (article.published && (article.public || this.authenticatedUser)));
            if (this.articles.length === 1) {
              this.router.navigate(['/pages', this.articles[0].id]);
            }
          }
        } else {   // page A la une

          this.featured = true;
          this.selectedCategory = this.FeaturedCategory;
          this.articleService.articles$.subscribe(
            (articles) => {
              this.articles = articles.filter((article) => (article.published && article.featured && (article.public || this.authenticatedUser)));
            });
        }
      }
    );
  }



}
