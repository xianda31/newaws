import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService, Article, UpdateArticleInput } from '../API.service';
import { ToastService } from '../tools/service/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articles: Article[] = [];
  _articles$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(this._articles);

  constructor(
    private api: APIService,
    private toastService: ToastService
  ) {

    // READ ALL CATEGORIES

    // this.api.ListArticles().then((result) => {
    //   this._articles = result.items as Article[];
    //   this._articles$.next(this._articles);
    // });

    this.loadArticles();

  }

  loadArticles(): Promise<any> {
    return new Promise(async (resolve) => {
      const articles = await this.api.ListArticles();
      if (articles.items) {
        return await Promise.all(articles.items.map(async (article) => {
          const articleData = await this.api.GetArticle(article!.id) as Article;
          this._articles.push(articleData);
        }
        )).then(() => {
          resolve(this._articles);
          console.log('%s articles: ', this._articles.length, this._articles);
          this._articles$.next(this._articles);
        });

      }

    });
  }


  get articles$(): Observable<Article[]> {
    return this._articles$ as Observable<Article[]>;
  }

  getArticleById(id: string): Article | undefined {
    return this._articles.find((article) => article.id === id);
  }

  // CRUD CATEGORIES


  createArticle(article: Article) {

    this.api.CreateArticle(article).then((result) => {
      const article = result as Article;
      this._articles.push(article);
      this._articles$.next(this._articles);
    })
      .catch((error) => {
        console.log('Error creating article: ', error);
        this.toastService.showErrorToast('aws', 'erreur création article');
      });
  }

  async readArticle(id: string): Promise<any> {
    return await this.api.GetArticle(id) as Article;
  }

  updateArticle(articleInput: UpdateArticleInput) {
    // console.log('articleInput: ', articleInput)
    this.api.UpdateArticle(articleInput)
      .then((result) => {
        const article = result as Article;
        this._articles = this._articles.map((cat) => cat.id === article.id ? article : cat);
        this._articles$.next(this._articles);
      })
      .catch((error) => {
        console.log('Error updating article: ', error);
        this.toastService.showErrorToast('aws', 'erreur mise à jour article');
      });

  }


  deleteArticle(article: Article) {
    this.api.DeleteArticle({ id: article.id }).then((result) => {
      this._articles = this._articles.filter((cat) => cat.id !== article.id);
      this._articles$.next(this._articles);
    })
      .catch((error) => {
        console.log('Error deleting article: ', error);
        this.toastService.showErrorToast('aws', 'erreur suppression article');
      });
  }
}
