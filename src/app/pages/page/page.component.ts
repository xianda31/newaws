import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService
  ) { }

  article!: Article;
  category!: Category;
  hasBeenUpdated: boolean = false;

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (paramMap.get('id')) {
          const id = paramMap.get('id')!;
          // console.log('id : ', id);
          this.article = await this.articleService.readArticle(id);
          this.category = await this.categoryService.getCategory(this.article.categoryId);
          if (this.article.updatedAt) {
            const createdAt = new Date(this.article.createdAt).setHours(0, 0, 0, 0);
            const updatedAt = new Date(this.article.updatedAt).setHours(0, 0, 0, 0);
            // console.log('updatedAt : ', updatedAt);
            // console.log('createdAt : ', createdAt);
            this.hasBeenUpdated = createdAt !== updatedAt;
          }

          // console.log('category : ', this.category);

        } else {   // page Home
          console.log('erreur : pas d\'id dans l\'url')
        }

      }

    );
  }

}
