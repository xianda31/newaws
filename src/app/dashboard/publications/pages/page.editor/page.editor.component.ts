import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map, tap } from 'rxjs';
import { Article, CreateArticleInput, CreatePictureInput, Page, Picture, UpdateArticleInput } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { ToastService } from 'src/app/tools/service/toast.service';
import tinymce from 'tinymce';
import { GetDateComponent } from '../get-date/get-date.component';
import { environment } from 'src/app/environments/environment';
import { Storage } from 'aws-amplify/lib-esm';
import { CardViewMode } from 'src/app/interfaces/page.interface';
import { FileService } from 'src/app/tools/service/file.service';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { Editor } from 'dist/bcsto/tinymce/tinymce';



@Component({
  selector: 'app-page.editor',
  templateUrl: './page.editor.component.html',
  styleUrls: ['./page.editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  @Input('id') pageId!: string;
  current_page!: Page;
  viewMode: CardViewMode = CardViewMode.Textual;
  pageForm!: FormGroup;

  articles$: Observable<Article[]> = this.articleService.articles$.pipe(
    map((articles) => articles.filter((article) => article.pageId === this.current_page.id)),
    map((articles) => articles.sort((a, b) => (a.rank < b.rank ? 1 : -1)))
  );
  solo !: boolean;

  date !: string;

  edit_mode: boolean = false;
  // currentHeadLineEditor: any | undefined;
  // currentBodyEditor: any | undefined;
  force_editor_reload = false;

  selected_article!: Article;
  articles !: Article[];
  maxRank !: number;
  myModal !: any;


  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private fileService: FileService,
    private pictureService: PictureService,

    private modalService: NgbModal,
    private toastService: ToastService,
    private router: Router,
  ) { }


  isViewMode(viewer: string): boolean {
    return (viewer === CardViewMode.Textual || viewer === CardViewMode.Pictural);
  }

  ngOnInit(): void {
    this.current_page = this.pageService.sgetPage(this.pageId);

    if (!this.isViewMode(this.current_page.viewer)) {
      console.log('page mode invalid : ', this.current_page.viewer);
    } else {
      this.viewMode = this.current_page.viewer as CardViewMode;
      console.log('page mode : ', this.viewMode);
    }


    this.articles$.subscribe((articles) => {
      this.articles = articles;
      this.maxRank = articles.reduce((max, article) => (article.rank > max ? article.rank : max), 0);
      // this.force_editor_reload = true // force editor to reload content from article
      // console.log('force editor reload', this.force_editor_reload);


    });

    this.createForm(this.current_page);

  }
  createForm(page: Page) {
    this.pageForm = new FormGroup({
      root_menu: new FormControl({ value: page.root_menu, disabled: true }),
      label: new FormControl({ value: page.label, disabled: true }),
      description: new FormControl({ value: page.description, disabled: true }),
      viewer: new FormControl({ value: page.viewer, disabled: true }),
    });

    // this.pageForm.patchValue(page);
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
  setDate(article: Article) {
    const modalRef = this.modalService.open(GetDateComponent, { centered: true });
    modalRef.componentInstance.article = article;

    modalRef.result.then((article) => {
      console.log('result', article);
      this.articleService.updateArticle(article);

    }).catch((error) => {
      console.log('error', error);
    });
  }


  // C(R)UD ARTICLES

  createArticle() {
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

  updateArticle(article: Article) {
    this.articleService.updateArticle(article);
    this.force_editor_reload = true // force editor to reload content from article
    // this.removeEditors(article);

  }

  deleteArticle(article: Article) {
    this.articleService.deleteArticle(article);
  }


  // C(R)UD PICTURES

  fullUrl(path: string, fname: string) {
    return 'pictures/' + path + fname;
  }
  reducePath(fullPath: string): string {
    return fullPath.replace('pictures/', '');

  }

  createPicture(filename: string) {
    console.log('createPicture');
    const picture: CreatePictureInput = {
      filename: filename,
      path: 'toto/',
      title: 'dummy picture',
      caption: 'la légendee',
      articleId: this.selected_article.id,
    };

    // console.log('attempt to upload picture file %o', this.image_file)
    const url = this.fullUrl('toto/', filename);

    this.fileService.uploadFile(url, filename)
      .then((result) => {
        // console.log('uploadFile', result);
        // this.url.patchValue(url);
        this.pictureService.createPicture(picture);
        // this.pictureForm.reset();
        // this.resetImgBuffer();
        // this.image_changed = false;
      })
      .catch((error) => { console.log('Error creating picture: ', error); });

  }

  updatePicture() {

  }


  async deletePicture(picture: Picture) {

  }




  // picture file upload

  setPictures(event: any) {
    const file = event.target.files[0];
    if (file === undefined) { return; }
    this.getImage64(file).then((image64) => {
      console.log('here, we\'ll set the image');
      // this.image_buffer = image64;
      // this.data.image = image64;
      this.createPicture(file.name);
    });
  }

  getImage64(file: File): Promise<string> {
    var promise: Promise<string> = new Promise((resolve: (arg0: string) => void) => {
      var image64 = '';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        image64 = e.target.result;
        resolve(image64);
      };
      reader.readAsDataURL(file);
    });
    return promise;
  }


  // tinyMCE


  selectArticle(article: Article) {

    if (this.selected_article === undefined) {
      this.selected_article = article;
      this.openEditors(this.selected_article);
      return;
    }
    if ((this.selected_article.id === article.id) && !this.force_editor_reload) {
      return;
    }
    this.force_editor_reload = false;
    this.removeEditors(this.selected_article);
    this.selected_article = article;
    this.openEditors(this.selected_article);
  }


  openEditors(article: Article) {

    const el_head = document.getElementById('headArea' + article.id);
    if (el_head === null) { console.log('edit_mode set to true but el not found !!!'); return; }
    this.initHeadLineEditor(el_head);

    // if (this.viewMode === CardViewMode.Textual) {
    const el_body = document.getElementById('bodyArea' + article.id);
    if (el_body === null) { console.log('edit_mode set to true but el not found !!!'); return; }
    this.initBodyEditor(el_body);
    // }
  }
  removeEditors(article: Article) {
    tinymce.EditorManager.remove('#headArea' + article.id);

    if (this.viewMode === CardViewMode.Textual) {
      tinymce.EditorManager.remove('#bodyArea' + article.id);
    }
  }

  headSave(html: SafeHtml): void {
    this.selected_article.headline = html.toString();
    this.updateArticle(this.selected_article);


  }

  bodySave(html: SafeHtml): void {
    const BucketName = environment.BucketName;
    const Region = environment.Region;
    const hostname = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com';
    this.selected_article.body = html.toString().replaceAll(hostname, 'https://HOSTNAME');
    this.updateArticle(this.selected_article);
  }

  initHeadLineEditor(el: HTMLElement) {
    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        // content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",

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
        if (editors.length === 0) console.log('initHeadLineEditor failed');
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
          this.bodySave(content.replaceAll('src="data:image', 'src="https://bcsto.s3.eu-west-3.amazonaws.com/public/images'));
        },

        file_picker_callback: (callback, value, meta) => { this.ImagePickerCallback(callback, value, meta) },

        images_upload_handler: this.image_upload_handler,

        image_caption: true,
      }).then((editors) => {
        // console.log('initBodyEditor : %s editors initialised', editors.length);
        if (editors.length === 0) console.log('initBodyEditor failed');
      });
  }

  image_upload_handler(blobInfo: { filename: () => string; blob: () => any; }, progress: any): Promise<string> {
    // console.log('image_upload_handler : ', blobInfo.filename(), blobInfo.blob());

    const buildURL = (key: string) => {
      const BucketName = environment.BucketName;
      const Region = environment.Region;
      const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;


      return uri;
    };

    let promise: Promise<string> = new Promise((resolve, reject) => {
      const key = 'images/' + blobInfo.filename();
      // console.log('image_upload_handler ==> key:%s file:%o ', key, blobInfo.blob());

      Storage.put(key, blobInfo.blob(), {
        level: 'public',
        // contentType: blobInfo.blob().type,
        progressCallback(progress: any) {
          console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        },
      })
        .then((result) => {
          // console.log('image_upload_handler : S3 result:%o ', result);
          resolve(buildURL(result.key));

        })
        .catch((err) => {
          console.log('image_upload_handler : S3 error:%o ', err);
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
        const id = this.selected_article.permalink + '/' + file.name; // + (new Date()).getTime();
        const image64 = e.target.result;
        const base64 = image64.split(',')[1];

        const blobCache = tinymce.activeEditor!.editorUpload.blobCache;

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


}
