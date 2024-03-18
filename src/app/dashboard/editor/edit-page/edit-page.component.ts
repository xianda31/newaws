import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { pageViewIcons } from 'src/app/interfaces/page.interface';
import { PageService } from '../../../aws.services/page.aws.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnChanges {
  @Input() page!: Page | null;
  @Output() pageChange = new EventEmitter<Page | null>();
  pageForm !: FormGroup;
  hasArticles: boolean = false;
  // viewIcons: { [key: string]: string } = pageViewIcons;

  constructor(
    private PageService: PageService,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'].isFirstChange()) return;
    if (this.page !== null) {
      this.hasArticles = (this.page.articles && this.page.articles?.items.length > 0) ? true : false;
      this.init_form(this.page);
    }
  }


  ngOnInit(): void {
    // initialisation du formulaire
    this.pageForm = new FormGroup({
      id: new FormControl(''),
      root_menu: new FormControl(''),
      label: new FormControl(''),
      rank: new FormControl(''),
      hidden: new FormControl(''),
      description: new FormControl(''),
      path: new FormControl(''),
      viewer: new FormControl(''),
      public: new FormControl(''),
    });

    if (this.page !== null) {
      this.init_form(this.page);
      this.hasArticles = (this.page.articles && this.page.articles?.items.length > 0) ? true : false;

    }
  }

  init_form(page: Page): void {
    let page_ = { ...page, rank: this.get_rank(page.label) };
    page_.label = this.strip_order(page.label);
    this.pageForm.patchValue(page_);
  }

  onUpdate(): void {
    let { ...page_ } = this.pageForm.value;
    page_.label = page_.rank + '#' + page_.label;
    delete page_.rank;
    this.PageService.updatePage(page_, true);
  }

  onDelete(): void {
    const { rank, ...page } = this.pageForm.value;
    this.PageService.deletePage(page);
    this.page = null;
    this.pageChange.emit(this.page);
  }

  strip_order(label: string): string {
    return label.replace(/^\w\#/g, '');
  }
  get_rank(label: string): number {
    return label.split('#')[0] ? parseInt(label.split('#')[0]) : 0;
  }

}
