import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Article } from 'src/app/API.service';
import { environment } from 'src/environments/environment';
import tinymce, { Editor } from 'tinymce';
import { Storage } from 'aws-amplify/lib-esm';
import { ArticleService } from 'src/app/aws.services/article.aws.service';



@Component({
  selector: 'app-edit-headline',
  templateUrl: './edit-headline.component.html',
  styleUrl: './edit-headline.component.scss'
})
export class EditHeadlineComponent implements OnDestroy, AfterViewInit, OnChanges {

  @Input() article !: Article;
  headlineEditor: Editor | null = null;
  withDate: boolean = false;

  constructor(
    private articleService: ArticleService,
  ) { }
  ngAfterViewInit(): void {
    this.openEditors();
  }
  ngOnDestroy(): void {
    this.removeEditors();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.withDate = this.article.date ? true : false;
  }
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

  onDateCheckBoxChange(event: any) {
    this.withDate = event.target.checked;
    if (this.withDate) {
      this.article.date = new Date().toISOString();
    } else {
      delete this.article.date;
    }
  }
  onChangeDate(event: any) {
    this.article.date = event.target.value;
  }
  getDate(): Date | null {
    if (!this.article.date) return null;
    return new Date(this.article.date);
  }

  openEditors() {
    const headlineId = document.getElementById('headArea' + this.article.id);
    if (!headlineId) {
      // console.log('%s not found !!', 'headArea' + this.article.id);
      return;
    }
    this.initHeadLineEditor(headlineId);

  }

  removeEditors() {
    this.headlineEditor?.remove();
  }

  headSave(html: SafeHtml): void {
    this.article!.headline = html.toString();
    this.articleService.updateArticle(this.article);
  }


  initHeadLineEditor(el: HTMLElement) {
    tinymce.init(
      {
        target: el,
        inline: true,
        // height: '200px',
        plugins: '  wordcount save',
        // menubar: 'edit  view format ',
        toolbar: 'undo redo save blocks | bold italic | forecolor |   cancel',
        toolbar_location: 'bottom',

        valid_elements: 'p[style],h*,strong,em,span[style]',
        valid_styles: { '*': 'font-size,font-family,color,text-decoration,text-align' },

        save_onsavecallback: () => { this.headSave(tinymce.activeEditor!.getContent()); },

      }).then((editors) => {
        if (editors.length === 0) {
          console.log('initHeadLineEditor failed with');
        }
        else {
          this.headlineEditor = editors[0];
        }
      });
  }


}
