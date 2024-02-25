import { Component, Input, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';

@Component({
  selector: 'app-edit-articles',
  templateUrl: './edit-articles.component.html',
  styleUrl: './edit-articles.component.scss'
})
export class EditArticlesComponent {
  @Input() page!: Page;
  private _page$: BehaviorSubject<Page> = new BehaviorSubject<Page>({} as Page);

  articles$: Observable<any> = combineLatest([
    this._page$,
    this.articleService.articles$]).pipe(
      map(([page, articles]) => articles.filter((article) => article.pageId === page.id)),
      map((articles) => articles.sort((a, b) => (a.rank > b.rank ? 1 : -1)))
    );


  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,

  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'].isFirstChange()) return;
    this._page$.next(this.page);

  }

  ngOnInit(): void {
    this._page$.next(this.page);
  }
}
