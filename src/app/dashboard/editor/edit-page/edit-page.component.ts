import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() page!: Page;
  pageForm !: FormGroup;
  viewIcons: { [key: string]: string } = pageViewIcons;
  // drag_list: { id: string, headline: string, rank: number }[] = [];

  constructor(
    private articleService: ArticleService,
    private PageService: PageService,
  ) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'].isFirstChange()) return;
    this.pageForm.patchValue(this.page);
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

    this.pageForm.patchValue(this.page);
    // this.drag_list = [];
    // if (this.page.articles?.items && this.page.articles.items.length > 0) {

    //   this.drag_list = this.page.articles.items.map((item) => ({ id: item!.id, headline: item!.headline, rank: item!.rank }));
    // }
  }

  getArticlesNumber(): number {
    if (!this.page.articles) return 0;
    return this.page.articles.items.length;
  }

  onUpdate(): void {
    console.log('submitting ..', this.pageForm.value);
    this.PageService.updatePage(this.pageForm.value, true);
  }

}
