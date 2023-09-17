import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private articleService: ArticleService,
    private router: Router
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

  onPublish(article: Article) {
    const { category, createdAt, updatedAt, __typename, ...articleInput } = article;
    this.articleService.updateArticle(articleInput);
  }

  onUpdate(article: Article) {
    console.log('routing to article : ', article.id);
    this.router.navigate(['dashboard/articles', article.id]);
    // this.createMode = false;
    // let article = this.backService.readArticle(objectId);
    // if (!article) {
    //   return;
    // }
    // this.articleForm.patchValue(article);
  }
}
