import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { Article, CreateArticleInput } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { FlashData } from 'src/app/layouts/pager/plugins/flash-plugin/flash-plugin.interface';
import { SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import tinymce from 'tinymce';


@Component({
  selector: 'app-mig-articles',
  templateUrl: './mig-articles.component.html',
  styleUrls: ['./mig-articles.component.scss']
})
export class MigArticlesComponent implements OnInit, AfterViewInit {


  // flashplug env
  data!: FlashData;
  showMore: boolean = false;
  body: string = '';

  // articles$: Observable<Article[]> = this.articleService.articles$;
  createForm !: FormGroup;
  bannerURL!: any;
  article !: Article;

  article0: CreateArticleInput = {
    title: 'horaires des tournois',
    head_html: '<p>headline<\p>',
    body_html_url: '',
    permalink: '',
    public: true,
    pageId: '64a54318-fb22-4dc1-8cad-6b6f738f0689',
    banner_url: 'bcsto.jpg',
    duedate: '2024-01-01',
  }

  constructor(
    private articleService: ArticleService,
    private modalService: NgbModal,

  ) { }
  ngAfterViewInit(): void {
    this.initHeadLineEditor();
    // tinymce.EditorManager.get('headArea')!.on('click', (e) => { console.warn('click', e) });
  }

  ngOnInit(): void {
    this.article0.permalink = this.article0.title.toLowerCase().replace(/\s/g, '-');
    this.article = this.article0 as Article;
    this.initForm();
    this.createForm.patchValue(this.article0);
    const article = this.createForm.getRawValue() as Article;
    this.data = this.flashData(article);

  }



  initForm() {
    this.createForm = new FormGroup({
      // management data
      title: new FormControl(''),
      permalink: new FormControl({ value: '', disabled: true }),   // equivalent to title ... replace ?
      public: new FormControl(''),
      pageId: new FormControl(''),

      // content data
      head_html: new FormControl(''),
      banner_url: new FormControl(''),
      body_html: new FormControl(''),    //  head_html wo base64 images (min size) -> dynamoDB

      body_html_url: new FormControl(''),       // todo : body -> bodyURL w base64 images (max size) -> S3

      duedate: new FormControl(''),   // date-like string OR '' (no date)

    });


  }

  toggleShowBody() {
    this.showMore = !this.showMore;
    if (this.showMore) {
      this.initBodyEditor();
    } else {
      tinymce.remove('#bodyArea');
    }
  }

  // view() {
  //   const article = this.createForm.getRawValue() as Article;
  //   this.data = this.flashData(article);
  // }

  // plugin adds

  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }


  // services 

  getHTMLcontent$(path: string): Observable<SafeHtml> {

    let HTMLdownload: Promise<string> = new Promise(async (resolve, reject) => {
      const blob = await Storage.get(path, { download: true });
      if (blob.Body === undefined) { reject(); }
      else { blob.Body.text().then((text) => { resolve(text); }); }
    });
    return from(HTMLdownload);
  }

  flashData(article: Article): FlashData {
    const flashData: FlashData = {
      title: article.title,
      banner_url: this.getURL('banners/' + article.banner_url),
      head_html: article.head_html,
      // body_html_path: 'articles/' + article.permalink,
      body_html$: this.getHTMLcontent$('articles/' + article.permalink),
      date: article.duedate ? new Date(article.duedate) : null,
    };
    return flashData;
  }

  getURL(key: string): string {
    const BucketName = 'bcstoapp0ee6a242edb74c79a78263aa5cb1473e113936-dev';
    const Region = 'eu-west-3';
    const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;

    console.log(uri);
    return uri;
  }


  // editor services

  initHeadLineEditor() {
    const el = document.getElementById('headArea');

    if (el === null) { return; }

    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        plugins: ' code  wordcount save',
        toolbar: 'undo redo | bold italic | forecolor | code | save cancel',
        save_onsavecallback: () => {
          // console.log('Saved');
          this.article0.head_html = tinymce.activeEditor!.getContent();
          this.createForm.patchValue({ head_html: this.article0.head_html });
        },
        toolbar_location: 'bottom',
        valid_elements: 'strong,em,span[style],a[href]',
        valid_styles: {
          '*': 'font-size,font-family,color,text-decoration,text-align'
        }
      });
  }

  initBodyEditor() {
    const el = document.getElementById('bodyArea');

    if (el === null) {
      console.log('el not found');
      return;
    }

    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        plugins: ' code  wordcount save',
        toolbar: 'undo redo | bold italic | forecolor | code | save cancel',
        save_onsavecallback: () => {
          // console.log('Saved');
          this.article0.body_html_url = tinymce.activeEditor!.getContent();
          // this.createForm.patchValue({body_html_url: this.article0.body_html_url });
          console.log(this.article0.body_html_url);
        },
        toolbar_location: 'bottom',
        // valid_elements: 'strong,em,span[style],a[href]',
        // valid_styles: {
        //   '*': 'font-size,font-family,color,text-decoration,text-align'
        // }
      });
  }

}

