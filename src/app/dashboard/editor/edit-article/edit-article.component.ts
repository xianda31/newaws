import { Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Article, Picture } from 'src/app/API.service';
import { LayoutIcons, Layouts } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent implements OnInit {
  @Input() article!: Article;
  layouts = Layouts
  withDate: boolean = false;
  articleForm !: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.withDate = this.article.date ? true : false;
    this.initForm();
  }

  initForm() {
    this.articleForm = new FormGroup({
      title: new FormControl(this.article.title),
      layout: new FormControl(this.article.layout),
      headline: new FormControl(this.article.headline),
      body: new FormControl(this.article.body),
      date: new FormControl(this.article.date),
      expiry_date: new FormControl(this.article.expiry_date),
      directory: new FormControl(this.article.directory),
      id: new FormControl(this.article.id),
      pageId: new FormControl(this.article.pageId),
    });
  }


  getLayout(layout: string): string {
    return this.layouts[layout as keyof typeof this.layouts];
  }

  onDateCheckBoxChange(event: any) {
    this.withDate = event.target.checked;
    if (this.withDate) {
      this.article.date = new Date().toISOString();
    } else {
      delete this.article.date;
    }
  }
  getDate(): Date | null {
    if (!this.article.date) return null;
    return new Date(this.article.date);
  }
  onChangeDate(event: any) {
    this.article.date = event.target.value;
  }

}
