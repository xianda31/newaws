import { transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { ShowBinComponent } from '../articles-trash/show-bin.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-bin',
  templateUrl: './bin.component.html',
  styleUrl: './bin.component.scss'
})
export class BinComponent implements OnInit {

  bin_list: { id: string, headline: string, layout: string, rank: number }[] = [];
  bin!: Page;
  filtered_pages: Page[] = [];
  selected_page: Page | null = null;
  @Input() show: boolean = false;
  @Output() showChange = new EventEmitter<boolean>();
  // selected_id: string = '';

  pages$: Observable<Page[]> = this.pageService.pages$;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private modalService: NgbModal,


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

  binIsEmpty(): boolean {
    return (!this.bin.articles || this.bin.articles.items.length === 0);
  }

  click_bin(): void {
    this.show = !this.show;
    this.showChange.emit(this.show);
    // const modalRef = this.modalService.open(ShowBinComponent, { centered: true });
  }
  // stripTags(html: string): string {
  //   return html.replace(/<[^>]*>?/gm, '').replace(/&eacute;/g, 'é')
  // }


  dropped(event: any) {
    transferArrayItem(event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex);

    console.log('BIN drop event', event.container.data);
    event.container.data.forEach((item: { id: string; }) => {
      let article = this.articleService.getArticleById(item.id);
      if (article) {
        article.pageId = this.bin.id;
        this.articleService.updateArticle(article);
      }
    });
  }

}
