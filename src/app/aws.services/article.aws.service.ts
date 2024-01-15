import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService, Article, CreateArticleInput, UpdateArticleInput } from '../API.service';
import { ToastService } from '../tools/service/toast.service';
import { environment } from '../environments/environment';
import { PictureService } from './picture.aws.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private _articles: Article[] = [];
  _articles$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(this._articles);
  onUpdateArticle$ = new BehaviorSubject<string>('');

  constructor(
    private api: APIService,
    private toastService: ToastService,
    private pictureService: PictureService,
  ) {
    this.loadArticles(!environment.logging_bypass);

    this.pictureService.onUpdatePicture$.subscribe((id) => {
      if (id === '') return;
      // console.log('articleService : pictures of articleid %s changed...');
      this.api.GetArticle(id).then((result) => {
        const article = result as Article;
        this._articles = this._articles.map((item) => item.id === article.id ? article : item);
        this._articles$.next(this._articles);
      });
    });

  }


  // chargement des articles depuis la base de données 
  loadArticles(public_only: boolean): void {
    this._articles = [];
    this.api.ListArticles() //public_only ? { public: { eq: true } } : {})
      .then((articles) => {
        const articlesItems = articles.items as Article[];
        // console.log('loadArticles', articlesItems);
        console.log('%s articles identifiés : ', articlesItems.length, articlesItems);
        this._articles = [...articlesItems];
        this._articles$.next(this._articles)
      })
      .catch((error) => {
        console.log('loadArticles error', error);

      })

  }


  get articles$(): Observable<Article[]> {
    return this._articles$ as Observable<Article[]>;
  }

  getArticleById(id: string): Article | undefined {
    return this._articles.find((article) => article.id === id);
  }

  // CRUD CATEGORIES


  createArticle(article: Article | CreateArticleInput) {
    // console.log('createArticle : ', article);

    this.api.CreateArticle(article).then((result) => {
      const article = result as Article;
      this._articles.push(article);
      this._articles$.next(this._articles);
      this.onUpdateArticle$.next(article.pageId);
    })
      .catch((error) => {
        console.log('Error creating article: ', error);
        this.toastService.showErrorToast('aws', 'erreur création article');
      });
  }

  async readArticle(id: string): Promise<any> {
    return await this.api.GetArticle(id) as Article;
  }

  updateArticle(article: Article) {
    // console.log('articleInput: ', articleInput)
    let { __typename, createdAt, updatedAt, pictures, documents, ...newArticleInput } = article;

    this.api.UpdateArticle(newArticleInput)
      .then((result) => {
        const newArticle = result as Article;

        this._articles = this._articles.map((item) => item.id === newArticle.id ? newArticle : item);
        this._articles$.next(this._articles);
      })
      .catch((error) => {
        console.log('Error updating article: ', error);
        this.toastService.showErrorToast('aws', 'erreur mise à jour article');
      });

  }


  deleteArticle(article: Article) {
    this.api.DeleteArticle({ id: article.id }).then((result) => {
      this._articles = this._articles.filter((item) => item.id !== article.id);
      this._articles$.next(this._articles);
      this.onUpdateArticle$.next(article.pageId);

    })
      .catch((error) => {
        console.log('Error deleting article: ', error);
        this.toastService.showErrorToast('aws', 'erreur suppression article');
      });
  }


  // utilities


}
