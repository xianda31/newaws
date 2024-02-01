import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArticleService } from '../../../aws.services/article.aws.service';
import { PageService } from '../../../aws.services/page.aws.service';
import { Article, Page } from 'src/app/API.service';
import { LayoutIcons } from 'src/app/interfaces/article.interface';


@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrl: './list-articles.component.scss'
})
export class ListArticlesComponent implements OnInit, OnChanges {
  drag_list: { id: string, headline: string, layout: string, rank: number }[] = [];
  icons = LayoutIcons;
  selected_id: string = '';
  @Input() page!: Page;
  @Output() select: EventEmitter<Article> = new EventEmitter<Article>();

  constructor(
    private articleService: ArticleService,
    private PageService: PageService,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'].isFirstChange()) return;
    this.init_drag_list();
  }

  ngOnInit(): void {
    this.init_drag_list();
  }

  init_drag_list(): void {
    this.drag_list = [];
    if (this.page.articles?.items && this.page.articles.items.length > 0) {
      this.drag_list = this.page.articles.items.map((item) => ({ id: item!.id, headline: item!.headline, layout: item!.layout, rank: item!.rank }));
    }
  }

  getArticlesNumber(): number {
    if (!this.page.articles) return 0;
    return this.page.articles.items.length;
  }

  getIcon(layout: string): string {
    const icon = this.icons[layout as keyof typeof this.icons];
    return this.icons[layout as keyof typeof this.icons];
  }

  onSelect(item: { id: string, headline: string, rank: number }): void {
    this.selected_id = item.id;
    let article = this.articleService.getArticleById(item.id);
    if (article) {
      // console.log('selecting article', article);
      this.select.emit(article);
    }
  }
  dropped(event: any) {
    moveItemInArray(this.drag_list, event.previousIndex, event.currentIndex);
    const count = this.drag_list.length;
    this.drag_list.forEach((item, index) => {
      console.log('%s was %s ~~> %s', item.headline, item.rank, count - index);
      let article = this.articleService.getArticleById(item.id);
      if (article) {
        article.rank = count - index;
        this.articleService.updateArticle(article);
      }
    });
  }

}
