import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/API.service';

@Component({
  selector: 'app-card-page',
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.scss']
})
export class CardPageComponent implements OnInit {
  @Input() page!: Page;



  ngOnInit(): void {
  }

  getArticlesNumber(): number {
    if (!this.page.articles) return 0;

    return this.page.articles.items.length;
  }
}
