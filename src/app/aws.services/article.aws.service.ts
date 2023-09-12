import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService, Article } from '../API.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articles: Article[] = [];
  _articles$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(this._articles);

  constructor(
    private api: APIService,
  ) {

    // READ ALL CATEGORIES

    this.api.ListArticles().then((result) => {
      this._articles = result.items as Article[];
      this._articles$.next(this._articles);
    });

  }

  get articles$(): Observable<Article[]> {
    return this._articles$ as Observable<Article[]>;
  }

  getArticleById(id: string): Article | undefined {
    return this._articles.find((article) => article.id === id);
  }

  // C(R)UD CATEGORIES


  createArticle(article: Article) {
    // console.log('createArticle ****', article);

    this.api.CreateArticle(article).then((result) => {
      const article = result as Article;
      this._articles.push(article);
      this._articles$.next(this._articles);
    })
      .catch((error) => { console.log('Error creating article: ', error); });
  }

  async readArticle(id: string): Promise<any> {
    return await this.api.GetArticle(id) as Article;
  }

  updateArticle(article: Article) {
    this.api.UpdateArticle(article).then((result) => {
      this._articles = this._articles.map((cat) => cat.id === article.id ? article : cat);
      this._articles$.next(this._articles);
    })
      .catch((error) => { console.log('Error updating article: ', error); });

  }


  deleteArticle(article: Article) {
    this.api.DeleteArticle({ id: article.id }).then((result) => {
      this._articles = this._articles.filter((cat) => cat.id !== article.id);
      this._articles$.next(this._articles);
    })
      .catch((error) => {
        console.log('Error deleting article: ', error);
      });
  }
}
