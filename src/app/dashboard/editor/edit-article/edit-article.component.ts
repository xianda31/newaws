import { Component, Input, OnChanges, OnInit, SimpleChanges, input } from '@angular/core';
import { Article } from 'src/app/API.service';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrl: './edit-article.component.scss'
})
export class EditArticleComponent implements OnInit, OnChanges {
  @Input() article: Article | null = null;

  ngOnInit(): void {
    // console.log('article', this.article);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('edit-article changed :', this.article);
  }


}
