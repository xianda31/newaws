import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, tap } from 'rxjs';
import { Article, CreateArticleInput, Page, UpdateArticleInput } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { ToastService } from 'src/app/tools/service/toast.service';
import tinymce from 'tinymce';


@Component({
  selector: 'app-page.editor',
  templateUrl: './page.editor.component.html',
  styleUrls: ['./page.editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  @Input('id') pageId!: string;
  current_page!: Page;
  pageForm!: FormGroup;

  articles$!: Observable<Article[]>;
  solo !: boolean;

  // editors : tinymce.Editor[] = [];



  edit_mode: boolean = false;
  article!: Article;


  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private modalService: NgbModal,

    private toastService: ToastService,
    private router: Router,
  ) { }



  ngOnInit(): void {
    this.current_page = this.pageService.sgetPage(this.pageId);

    this.articles$ = this.articleService.articles$.pipe(
      map((articles) => articles.filter((article) => article.pageId === this.current_page.id))
    );

    this.articles$.subscribe((articles) => {
      // console.log('page.editor : this page has %s articles : %o', articles.length, articles);
      this.edit_mode = false;

    })
      ;

    this.pageForm = new FormGroup({
      label: new FormControl({ value: '', disabled: true }),
      root_menu: new FormControl({ value: '', disabled: true }),
      hidden: new FormControl({ value: '', disabled: true }),
      description: new FormControl({ value: '', disabled: true }),
      path: new FormControl({ value: '', disabled: true }),
      viewer: new FormControl({ value: '', disabled: true }),
    });

    this.pageForm.patchValue(this.current_page);
  }

  addArticle() {
    // create dummy article
    const article: CreateArticleInput = {
      title: 'dummy article',
      permalink: 'dummy-article',
      headline: 'dummy article headline',
      body: '<p>dummy article body</p>',
      info: '2024-01-01',
      image_url: 'dummy-article.jpg',
      rank: 0,
      public: true,
      pageId: this.current_page.id,
    };
    this.articleService.createArticle(article);

  }

  up(article: Article) {

  }
  down(article: Article) {
  }
  delete(article: Article) {
    this.articleService.deleteArticle(article);
  }
  modify(article: Article) {
    this.edit_mode = true;
    this.article = article;
    const el = document.getElementById('headArea' + this.article.id);

    if (el === null) {
      console.log('edit_mode set to true but el not found !!!');
      return;
    } else {

      console.log('el found', el);
      this.initHeadLineEditor(el);
    }
  }

  update(article: Article) {
    // let newArticle!: UpdateArticleInput;
    let { __typename, createdAt, updatedAt, pictures, ...newArticle } = article;
    console.log('updating article .... %o', newArticle);
    this.articleService.updateArticle(newArticle);
    this.removeEditors();

  }



  headSave(html: SafeHtml): void {
    this.article.headline = html as string;
    // this.createForm.patchValue({ head_html: this.article0.headline });
    this.article.headline = html.toString();
    console.log('headSave %s bytes', this.article.headline.length);
  }

  initHeadLineEditor(el: HTMLElement) {
    // const el = document.getElementById('headArea');
    if (el === null) {
      console.log('el not found');
      return;
    }
    console.log('initHeadLineEditor : el=', el);

    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",

        plugins: ' code  wordcount save',
        toolbar: 'undo redo blocks | bold italic | forecolor | code | save cancel',
        save_onsavecallback: () => {
          this.headSave(tinymce.activeEditor!.getContent());
          // console.log('Saved');
        },
        toolbar_location: 'bottom',
        valid_elements: 'p[style],h*,strong,em,span[style]',
        valid_styles: {
          '*': 'font-size,font-family,color,text-decoration,text-align'
        }
      }).then((editors) => {
        console.log('initHeadLineEditor : %s editors initialised', editors.length, editors);
        // tinymce.activeEditor!.setContent(this.article.headline);
      });
  }

  removeEditors() {
    // if (this.editorExist) {
    tinymce.EditorManager.remove('#headArea' + this.article.id);
    // tinymce.remove(el);
    // this.editorExist = false;
  }
}
