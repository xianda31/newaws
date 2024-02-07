import { Component } from '@angular/core';
import { Article, Page } from '../../../API.service';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent {
  selected_menu: string = '';
  selected_page: Page | null = null;
  selected_article: Article | null = null;

  select_menu(menu: string): void {
    this.selected_menu = menu;
    this.selected_page = null;
    this.selected_article = null;
  }

  select_page(page: Page): void {
    this.selected_page = page;
    this.selected_article = null;
  }

  select_article(article: Article): void {
    this.selected_article = article;
  }
}
