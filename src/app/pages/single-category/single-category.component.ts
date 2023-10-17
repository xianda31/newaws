import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { ToastService } from 'src/app/tools/service/toast.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnChanges {  //OncChanges pour pouvoir réagir aux changements internes de paramètres

  @Input('cat') categoryLabel!: string;// @RouteParam()
  @Input('aid') articleId!: string;// @RouteParam()

  articles$: Observable<Article[]> = this.articleService.articles$.pipe(
    map((articles) => articles.filter((article) => article.categoryId === this.selectedCategory.id)),
    map((articles) => articles.sort((a, b) => ((a.createdAt > b.createdAt) || (a.id === this.articleId) ? -1 : 1))),
    map((articles) => articles.sort((a, b) => ((a.id === this.articleId) && b.id ? -1 : 1))));

  selectedCategory!: Category;
  selectedArticle!: Article;
  HTMLstring!: string;


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private toastService: ToastService
  ) { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['categoryLabel']) {
      this.selectedCategory = this.categoryService.getCategoryByLabel(changes['categoryLabel'].currentValue);
      await this.loadCategory();
    }
  }


  async loadCategory() {
    this.articles$.subscribe(async (articles) => {
      if (articles.length !== 0) {
        this.selectedArticle = this.articleId ? articles.find((article) => (article.id === this.articleId))! : articles[0];
        this.HTMLstring = await this.loadHTML(this.selectedArticle);
      } else {
        // comprendre pourquoi on passe ici !!!!!
        // this.toastService.showWarningToast('cat', 'categorie vide !!');
      }
    });
  }


  async selectArticle(article: Article) {
    this.selectedArticle = article;
    this.HTMLstring = await this.loadHTML(article);
  }

  loadHTML(article: Article): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const blob = await Storage.get('articles/' + article.permalink, { download: true });
      if (blob.Body === undefined) { reject(); }
      else { blob.Body.text().then((text) => { resolve(text); }); }
    });
  }

}



