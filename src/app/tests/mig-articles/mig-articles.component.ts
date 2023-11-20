import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, Sanitizer } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Article, CreateArticleInput } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { FlashData } from 'src/app/layouts/pager/plugins/flash-plugin/flash-plugin.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import tinymce from 'tinymce';


@Component({
  selector: 'app-mig-articles',
  templateUrl: './mig-articles.component.html',
  styleUrls: ['./mig-articles.component.scss']
})


export class MigArticlesComponent implements OnInit, AfterViewInit {

  @ViewChildren('bodyArea') bodyArea!: QueryList<any>;
  @ViewChildren('headArea') headArea!: QueryList<any>;

  // flashplug env
  data!: FlashData;


  showMore: boolean = false;
  editBody: boolean = false;
  editorExist: boolean = false;
  body_html !: SafeHtml;
  // body: string = '';

  // articles$: Observable<Article[]> = this.articleService.articles$;
  createForm !: FormGroup;
  bannerURL!: any;
  // article !: Article;

  article0: CreateArticleInput = {
    title: 'les cours redémarrent',
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
    private sanitizer: DomSanitizer,
  ) { }

  ngAfterViewInit(): void {
    this.headArea.changes.subscribe((r) => {
      this.initHeadLineEditor()
    });
    this.bodyArea.changes.subscribe((r) => {
      if (this.showMore && this.editBody) {
        this.removeBodyLineEditor();   // au cas ou il existe déjà  
        this.initBodyEditor()
      }
    });
  }

  async ngOnInit(): Promise<void> {
    this.article0.permalink = this.article0.title.toLowerCase().replace(/\s/g, '-');
    // this.article = this.article0 as Article;
    this.initForm();
    this.createForm.patchValue(this.article0);
    const article = this.createForm.getRawValue() as Article;

    this.HTMLcontentPromise('articles/' + article.permalink).then((html) => {
      this.body_html = html;
      // console.log('initial body :', this.body_html);
      this.triggerView(article, this.body_html);
    });
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


  toggleEditBody() {

    console.log('toggleEditBody', this.editBody, this.showMore);
    // si editBody = true on force showMore à true s'il ne l'etait pas déjà (et on init l'éditeur)
    if (this.editBody && !this.showMore) { this.showMore = true; }
    if (this.editBody && this.showMore) { this.initBodyEditor(); }
    if (!this.editBody && this.showMore) { this.removeBodyLineEditor(); }
  }



  // plugin adds

  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }


  // services 

  HTMLcontentPromise(path: string): Promise<SafeHtml> {

    let HTMLdownload: Promise<SafeHtml> = new Promise(async (resolve, reject) => {
      const blob = await Storage.get(path, { download: true });
      if (blob.Body === undefined) { reject(); }
      else {
        blob.Body.text().then((text) => {
          const html: SafeHtml = this.sanitizer.bypassSecurityTrustHtml(text);
          resolve(html);
        });
      }
    });
    return (HTMLdownload);
  }

  triggerView(article: Article, body_html: SafeHtml): void {
    const flashData: FlashData = {
      title: article.title,
      banner_url: this.getURL('banners/' + article.banner_url),
      head_html: article.head_html,
      body_html: body_html, //this.getHTMLcontent$('articles/' + article.permalink),
      date: article.duedate ? new Date(article.duedate) : null,
    };
    console.log('triggerView', flashData);
    this.data = flashData;
  }

  getURL(key: string): string {
    const BucketName = 'bcstoapp0ee6a242edb74c79a78263aa5cb1473e113936-dev';
    const Region = 'eu-west-3';
    const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;

    // console.log(uri);
    return uri;
  }


  // editor services




  initHeadLineEditor() {
    const el = document.getElementById('headArea');

    if (el === null) {
      console.log('el not found');
      return;
    }
    console.log('create new head editor @', el);
    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",

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
  removeBodyLineEditor() {
    if (this.editorExist) {
      tinymce.remove('#bodyArea');
      this.editorExist = false;
    }

  }
  initBodyEditor() {
    const el = document.getElementById('bodyArea');

    if (el === null) {
      console.log('el not found');
      return;
    }

    this.editorExist = true;
    console.log('create new body editor @', el);

    tinymce.init(
      {
        target: el,
        inline: false,
        menubar: 'file edit table insert view format tools',

        // format: 'html',
        content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        editable_root: false,
        editable_class: 'editable',
        elementpath: false,

        plugins: 'anchor autolink link lists image code save wordcount table',  //
        toolbar: 'undo redo save | table | blocks | bold italic strikethrough backcolor | mergetags | link image | align bullist numlist | code ',

        // table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',

        // valid_elements: 'table,head,p[style],strong,em,span[style],a[href],ul,ol,li',
        // valid_styles: {
        //   '*': 'font-size,font-family,color,text-decoration,text-align'
        // },

        save_onsavecallback: () => {
          this.body_html = tinymce.activeEditor!.getContent();
          // this.createForm.patchValue({body_html_url: this.body_html });
          console.log(this.body_html);
          this.data.body_html = this.sanitizer.bypassSecurityTrustHtml(this.body_html as string);
        },
        toolbar_location: 'bottom',
        // valid_elements: 'strong,em,span[style],a[href]',
        // valid_styles: {
        //   '*': 'font-size,font-family,color,text-decoration,text-align'
        // }
      });
  }

}

