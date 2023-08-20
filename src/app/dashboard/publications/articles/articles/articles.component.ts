import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {

  articles$!: Observable<Article[]>;  //= this.articleService.articles$;

  constructor(
    // private backService: B4aService,
    // private fileService: FileService,
    // private articleService: ArticleService
  ) { }
  ngOnInit(): void {
    // this.articles$.subscribe((articles) => {
    //   console.log('articles', articles);
    // }
    // )
  }



  onDelete(objectId: string) {
    // this.backService.deleteArticle(objectId);
  }

  onUpdate(objectId: string) {
    // this.createMode = false;
    // let article = this.backService.readArticle(objectId);
    // if (!article) {
    //   return;
    // }
    // this.articleForm.patchValue(article);
  }
}
