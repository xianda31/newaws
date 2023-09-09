import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article } from 'src/app/API.service';
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
    private articleService: ArticleService
  ) { }

  article!: Article;

  ngOnInit(): void {

    console.log('PageComponent ngOnInit');
    this.activatedRoute.paramMap.subscribe(
      async paramMap => {
        if (paramMap.get('id')) {
          const id = paramMap.get('id')!;
          // console.log('id : ', id);
          this.article = await this.articleService.readArticle(id);
          // console.log('article : ', this.article);

        } else {   // page Home
          console.log('erreur : pas d\'id dans l\'url')
        }

      }

    );
  }

}
