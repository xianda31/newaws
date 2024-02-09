import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, filter, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';

@Component({
  selector: 'app-articles-trash',
  templateUrl: './articles-trash.component.html',
  styleUrl: './articles-trash.component.scss'
})
export class ArticlesTrashComponent implements OnInit {
  bin_list: { id: string, headline: string, layout: string, rank: number }[] = [];
  bin!: Page;
  filtered_pages: Page[] = [];
  selected_page: Page | null = null;
  selected_id: string = '';

  pages$: Observable<Page[]> = this.pageService.pages$;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,


  ) { }
  ngOnInit(): void {
    this.pageService.pages$.pipe(
      map((pages) => pages.filter((page) => page.root_menu.toLocaleLowerCase().includes('articlesbin'))
      ))
      .subscribe((pages) => {
        if (pages.length === 0) {
          console.log('no bin page found');
          return;
        }
        this.bin = pages[0];
        this.init_bin_list();
      });

  }


  init_bin_list(): void {
    this.bin_list = [];
    if (this.bin!.articles?.items && this.bin!.articles.items.length > 0) {
      this.bin_list = this.bin!.articles.items.map((item) => ({ id: item!.id, headline: item!.headline, layout: item!.layout, rank: item!.rank }));
    }
  }

  getArticlesNumber(): number {
    if (!this.bin!.articles) return 0;
    return this.bin!.articles.items.length;
  }

  stripTags(html: string): string {
    return html.replace(/<[^>]*>?/gm, '').replace(/&eacute;/g, 'é')
  }

  onSelect(item: { id: string, headline: string, rank: number }): void {
    this.selected_id = item.id;
    let article = this.articleService.getArticleById(item.id);
    if (article) {
      // console.log('selecting article', article);
      // this.select.emit(article);
    }
  }
  dropped(event: any) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);

    console.log('trash drop event', event.container.data);
    const count = this.bin_list.length;
    this.bin_list.forEach((item) => {
      let article = this.articleService.getArticleById(item.id);
      if (article) {
        article.pageId = this.bin.id;
        this.articleService.updateArticle(article);
      }
    });
  }

}
