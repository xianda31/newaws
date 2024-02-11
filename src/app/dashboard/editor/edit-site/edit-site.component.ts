import { Component, OnInit } from '@angular/core';
import { Article, Page } from '../../../API.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';

@Component({
  selector: 'app-edit-site',
  templateUrl: './edit-site.component.html',
  styleUrls: ['./edit-site.component.scss']
})
export class EditSiteComponent implements OnInit {
  selected_menu: string = '';
  selected_page: Page | null = null;
  selected_article: Article | null = null;
  show_bin: boolean = false;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.pageService.pages$.subscribe((pages) => {
      // maj de la page sélectionnée
      if (this.selected_page) {
        this.selected_page = pages.find((page) => page.id === this.selected_page!.id)!;
      }
    });

    this.articleService.articles$.subscribe((articles) => {
      // maj de l'article sélectionné
      if (this.selected_article) {
        this.selected_article = articles.find((article) => article.id === this.selected_article!.id)!;
      }
    });


  }

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
