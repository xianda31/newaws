import { Component, OnInit } from '@angular/core';
import { CategoryService } from './aws.services/category.aws.service';
import { ArticleService } from './aws.services/article.aws.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  catloaded: boolean = false;
  articlesLoaded: boolean = true;  // impossible de trigger le chargement des articles dans le header
  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService
  ) { }
  ngOnInit(): void {

    // initialisation de categories nécessaire au chargement dynamique du menu (header ))


    this.categoryService.categories$.subscribe((categories) => {
      if (categories.length > 0) {
        console.log('%s categories loaded', categories.length, categories);
        this.catloaded = true;
      }

    });


    // this.articleService.articles$.subscribe((articles) => {
    //   if (articles.length > 0) {
    //     this.articlesLoaded = true;
    //   }
    //   console.log('%s articles loaded', articles.length, articles);
    // }
    // );

  }



  title = 'bcsto';
}
