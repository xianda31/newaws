import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  articles$: Observable<Article[]> = this.articleService.articles$;
  theCategory!: Category;
  articles: Article[] = [];

  HomeCategory: Category = {
    id: '',
    __typename: 'Category',
    label: 'Home',
    description: 'Les points majeurs',
    createdAt: '',
    updatedAt: ''
  }

  dummyArticle: Article = {
    id: "",
    title: "titre bidon",
    __typename: 'Article',
    summary: 'résumé de l\'article',
    body: '',
    categoryId: '',
    published: false,
    featured: false,
    createdAt: '',
    updatedAt: ''
  }

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private articleService: ArticleService,

  ) { }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (paramMap.get('id')) {
          const id = paramMap.get('id')!;
          // console.log('id : ', id);
          this.theCategory = await this.categoryService.getCategory(id);
          if (this.theCategory.articles!.items) {
            this.articles = this.theCategory.articles!.items as Article[];
          }
          // console.log('theCategory : ', this.theCategory);
        } else {   // page Home
          // this.articles.push(this.dummyArticle);
          this.articleService.articles$.subscribe(
            (articles) => {
              this.articles = articles.filter((article) => (article.published && article.featured))
            });

          this.theCategory = this.HomeCategory;
        }

      }

    );
  }

}
