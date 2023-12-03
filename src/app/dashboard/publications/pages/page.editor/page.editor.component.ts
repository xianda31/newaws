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
import { GetDateComponent } from '../get-date/get-date.component';
import { environment } from 'src/app/environments/environment';
import { Storage } from 'aws-amplify/lib-esm';



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

  date !: string;

  edit_mode: boolean = false;
  article!: Article;
  articles !: Article[];
  maxRank !: number;
  myModal !: any;


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
      map((articles) => articles.filter((article) => article.pageId === this.current_page.id)),
      map((articles) => articles.sort((a, b) => (a.rank < b.rank ? 1 : -1)))
    );

    this.articles$.subscribe((articles) => {
      this.articles = articles;
      this.maxRank = articles.reduce((max, article) => (article.rank > max ? article.rank : max), 0);
    });

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
      headline: '<h2>Lorem Ipsum dolor sit amet</h2>',
      body: '<div class="editable"> <div style="float: left;margin-top:0.5em;margin-right:1em;"><img src="../assets/images/bcsto.jpg" style="width:10rem" alt="bcsto"></div><div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque ullamcorper libero non pretium. Sed facilisis nisl nec interdum interdum. Fusce eu lorem quis ante ultrices vehicula ultrices et nunc. Fusce ac velit felis. Aenean faucibus, dolor eget convallis lobortis, mauris sapien porttitor urna, ac dapibus massa velit eu ante. Etiam molestie tincidunt purus a maximus. Nulla sed vehicula metus, non malesuada diam. Nunc imperdiet metus a tellus tincidunt, eget tincidunt augue blandit. Etiam ut tellus enim.</div></div>',
      info: new Date().toISOString(),
      image_url: 'dummy-article.jpg',
      rank: this.maxRank + 1,
      public: true,
      pageId: this.current_page.id,
    };


    this.articleService.createArticle(article);

  }

  up(i: number) {
    if (i === 0) return;
    // swap [i] and [i-1]
    const tmp = this.articles[i].rank;
    this.articles[i].rank = this.articles[i - 1].rank;
    this.articles[i - 1].rank = tmp;
    this.articleService.updateArticle(this.articles[i]);
    this.articleService.updateArticle(this.articles[i - 1]);

  }
  down(i: number) {
    if (i === (this.articles.length - 1)) return;
    // swap [i] and [i+1]
    const tmp = this.articles[i].rank;
    this.articles[i].rank = this.articles[i + 1].rank;
    this.articles[i + 1].rank = tmp;
    this.articleService.updateArticle(this.articles[i]);
    this.articleService.updateArticle(this.articles[i + 1]);

  }
  change_info(article: Article) {
    this.article = article;
  }

  delete(article: Article) {
    this.articleService.deleteArticle(article);
  }
  modify(article: Article) {
    this.edit_mode = true;
    this.article = article;

    const el_head = document.getElementById('headArea' + this.article.id);
    if (el_head === null) { console.log('edit_mode set to true but el not found !!!'); return; }
    this.initHeadLineEditor(el_head);

    const el_body = document.getElementById('bodyArea' + this.article.id);
    if (el_body === null) { console.log('edit_mode set to true but el not found !!!'); return; }
    this.initBodyEditor(el_body);
  }

  openDateModal(article: Article) {
    const modalRef = this.modalService.open(GetDateComponent, { centered: true });
    modalRef.componentInstance.article = article;

    modalRef.result.then((article) => {
      console.log('result', article);
      this.articleService.updateArticle(article);

    }).catch((error) => {
      console.log('error', error);
    });
  }

  update(article: Article) {
    this.articleService.updateArticle(article);
    this.removeEditors();

  }

  // tinyMCE

  headSave(html: SafeHtml): void {
    this.article.headline = html as string;
    this.article.headline = html.toString();
  }

  bodySave(html: SafeHtml): void {
    this.article.body = html.toString();
    this.article.body = html.toString();  //this.sanitizer.bypassSecurityTrustHtml(this.body as string);
    this.update(this.article);
    // console.log('bodySave %s bytes', this.data.body.length);
  }

  initHeadLineEditor(el: HTMLElement) {
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
        if (editors.length == 0) console.log('initHeadLineEditor failed');
      });
  }


  initBodyEditor(el: HTMLElement) {

    tinymce.init(
      {
        target: el,
        inline: false,

        // content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        editable_root: false,
        editable_class: 'editable',

        plugins: 'anchor autolink link lists image code save wordcount table',  //
        menubar: 'file edit table insert view format tools',
        toolbar: 'undo redo save | table | blocks | bold italic strikethrough backcolor | mergetags | link image | align bullist numlist | code ',
        table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
        toolbar_location: 'bottom',

        save_onsavecallback: () => {
          // tinymce.activeEditor!.uploadPictures();
          let content = tinymce.activeEditor!.getContent();
          this.bodySave(content);
        },

        file_picker_callback: (callback, value, meta) => { this.ImagePickerCallback(callback, value, meta) },

        images_upload_handler: this.image_upload_handler,

        image_caption: true,
      }).then((editors) => {
        console.log('initBodyEditor : %s editors initialised', editors.length);
        if (editors.length == 0) console.log('initBodyEditor failed');
      });
  }

  image_upload_handler(blobInfo: { filename: () => string; blob: () => any; }, progress: any): Promise<string> {
    console.log('image_upload_handler : ', blobInfo.filename(), blobInfo.blob());

    const buildURL = (key: string) => {
      const BucketName = environment.BucketName;
      const Region = environment.Region;
      const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;
      return uri;
    };

    let promise: Promise<string> = new Promise((resolve, reject) => {
      const key = 'images/' + blobInfo.filename();
      console.log('image_upload_handler ==> key:%s file:%o ', key, blobInfo.blob());

      Storage.put(key, blobInfo.blob(), {
        level: 'public',
        // contentType: blobInfo.blob().type,
        progressCallback(progress: any) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
        .then((result) => {
          console.log('image_upload_handler : result:%o ', result);
          resolve(buildURL(result.key));

        })
        .catch((err) => {
          reject(err);
        });


    });
    return (promise);
  }
  ImagePickerCallback(cb: (blobUri: string, arg1: { title: string; }) => void, value: any, meta: any): void {
    // create an off-screen canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const id = this.article.permalink + '/' + file.name; // + (new Date()).getTime();
        const image64 = e.target.result;
        const blobCache = tinymce.activeEditor!.editorUpload.blobCache;
        const base64 = image64.split(',')[1];


        // console.log('ImagePickerCallback : sauvegarde en cache de %o, sous reference id %s', file, id);
        const blobInfo = blobCache.create(id, file, base64, id, id);
        blobCache.add(blobInfo);
        /* call the callback and populate the Title field with the file name */
        // console.log('ImagePickerCallback : appel du callback avec blobUri %s et title: %s', blobInfo.blobUri(), id);
        cb(blobInfo.blobUri(), { title: id });
      };

      reader.readAsDataURL(file);
    });

    input.click();

  }




  removeEditors() {
    // if (this.editorExist) {
    tinymce.EditorManager.remove('#headArea' + this.article.id);
    tinymce.EditorManager.remove('#bodyArea' + this.article.id);
    // tinymce.remove(el);
    // this.editorExist = false;
  }
}
