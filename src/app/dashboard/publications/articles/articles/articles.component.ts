import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Article } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<Article[]> = this.articleService.articles$;

  constructor(
    private articleService: ArticleService
  ) { }
  ngOnInit(): void {
    this.articles$.subscribe((articles) => {
      // console.log('articles', articles);
    }
    )
  }



  onDelete(article: Article) {
    this.articleService.deleteArticle(article);
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
