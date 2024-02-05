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
      this.pageForm.patchValue(this.page);
    }
  }


  ngOnInit(): void {
    // initialisation du formulaire
    this.pageForm = new FormGroup({
      id: new FormControl(''),
      root_menu: new FormControl(''),
      label: new FormControl(''),
      hidden: new FormControl(''),
      description: new FormControl(''),
      path: new FormControl(''),
      viewer: new FormControl(''),
      public: new FormControl(''),
    });

    if (this.page !== null) {
      this.pageForm.patchValue(this.page);
      this.hasArticles = (this.page.articles && this.page.articles?.items.length > 0) ? true : false;

    }
  }


  onUpdate(): void {
    this.PageService.updatePage(this.pageForm.value, true);
  }

  onDelete(): void {
    this.PageService.deletePage(this.pageForm.value);
    this.page = null;
    this.pageChange.emit(this.page);
  }
}
