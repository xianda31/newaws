import { Component, Input } from '@angular/core';
import { Article } from 'src/app/API.service';

@Component({
  selector: 'app-display-article',
  templateUrl: './display-article.component.html',
  styleUrl: './display-article.component.scss'
})
export class DisplayArticleComponent {
  @Input() article: Article = {} as Article;
  @Input() columnView: boolean = false;


  getMonth(date: string | null | undefined): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    if (!date) return '';
    let d = new Date(date);
    let m = d.getMonth();
    return months[m];
    // return date.toLocaleString('fr-FR', { month: 'short' });
  }
  getDayOfTheMonth(date: string | null | undefined): number {
    if (!date) return 0;
    let d = new Date(date);
    return d.getDate();
  }


  getFolder(article: Article): string {
    return '';
  }

  getRoot(article: Article) {
    return article.directory ?? '';
  }

}
