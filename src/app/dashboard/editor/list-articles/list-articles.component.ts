import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ArticleService } from '../../../aws.services/article.aws.service';
import { Article, CreateArticleInput, Page } from '../../../API.service';
import { GetArticleNameComponent } from '../../../shared/modals/get-article-name/get-article-name.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article_prefilled } from '../../../interfaces/article.interface';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';


@Component({
  selector: 'app-list-articles',
  templateUrl: './list-articles.component.html',
  styleUrl: './list-articles.component.scss'
})
export class ListArticlesComponent implements OnInit, OnChanges {
  drag_list: { id: string, headline: string, layout: string, rank: number }[] = [];
  // icons = LayoutIcons;
  selected_id: string = '';
  @Input() page!: Page;
  @Output() select: EventEmitter<Article> = new EventEmitter<Article>();
  private _page$: BehaviorSubject<Page> = new BehaviorSubject<Page>({} as Page);

  articles$: Observable<any> = combineLatest([
    this._page$,
    this.articleService.articles$]).pipe(
      map(([page, articles]) => articles.filter((article) => article.pageId === page.id)),
      map((articles) => articles.sort((a, b) => (a.rank > b.rank ? 1 : -1)))
    );
  show_bin: boolean = false;


  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,

  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'].isFirstChange()) return;
    this._page$.next(this.page);

    this.init_drag_list();
  }

  ngOnInit(): void {
    this._page$.next(this.page);
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

  stripTags(html: string): string {
    return html.replace(/<[^>]*>?/gm, '').replace(/&eacute;/g, 'é').replace(/&nbsp;/g, ' ')
  }

  onCreate() {
    let article: CreateArticleInput = { ...Article_prefilled } as CreateArticleInput;
    const modalRef = this.modalService.open(GetArticleNameComponent, { centered: true });
    modalRef.result.then((layout) => {
      article.title = this.page.label + '/' + layout + this.getArticlesNumber(),
        article.headline = Article_prefilled.headline;
      article.layout = layout;
      article.body = Article_prefilled.body;
      article.pageId = this.page.id;
      article.rank = this.getArticlesNumber();

      this.articleService.createArticle(article);

    });
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
    if (event.previousContainer === event.currentContainer) {
      moveItemInArray(this.drag_list, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    const count = this.drag_list.length;
    this.drag_list.forEach((item, index) => {
      let article = this.articleService.getArticleById(item.id);
      if (article) {
        article.rank = index;
        article.pageId = this.page.id;   // cas où on déplace un article d'une page à une autre
        this.articleService.updateArticle(article);
      }
    });
  }
}

