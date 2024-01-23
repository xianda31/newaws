import { Component, Input, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { Article, CreateArticleInput, CreatePictureInput, Page, Picture } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import tinymce from 'tinymce';
import { GetDateComponent } from '../get-date/get-date.component';
import { environment } from 'src/environments/environment';
import { Storage } from 'aws-amplify/lib-esm';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { GetPictureInfoComponent } from '../get-picture-info/get-picture-info.component';
import { ToastService } from 'src/app/tools/service/toast.service';
import { PictureOrientationTypeEnum } from 'src/app/interfaces/picture.interface';
import { Layout, LayoutIcons, Layouts, PictureOp } from 'src/app/interfaces/article.interface';



@Component({
  selector: 'app-page.editor',
  templateUrl: './page.editor.component.html',
  styleUrls: ['./page.editor.component.scss']
})
export class PageEditorComponent implements OnInit {
  @Input('id') pageId!: string;
  current_page!: Page;
  path !: string;


  articles$: Observable<Article[]> = this.articleService.articles$.pipe(
    map((articles) => articles.filter((article) => article.pageId === this.current_page.id)),
    map((articles) => articles.sort((a, b) => (a.rank < b.rank ? 1 : -1)))
  );

  edit_mode: boolean = false;
  force_editor_reload = false;

  current_article: Article | null = null;
  articles !: Article[];
  maxRank !: number;
  myModal !: any;





  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private pictureService: PictureService,
    private toastService: ToastService,
    private modalService: NgbModal,
  ) { }



  ngOnInit(): void {
    this.current_page = this.pageService.sgetPage(this.pageId);
    this.path = this.current_page.root_menu + (this.current_page.label ? '/' + this.current_page.label : '');

    this.articles$.subscribe((articles) => {
      this.articles = articles;
      this.maxRank = articles.reduce((max, article) => (article.rank > max ? article.rank : max), 0);
      // console.log('articles updated : %o', this.articles);

    });


  }

  getLayoutMeaning(layout: Layout | string): string {
    return Layouts[layout as Layout];
  }
  getLayoutIcon(layout: Layout | string): string {
    return LayoutIcons[layout as Layout];
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
      // console.log('result', article);
      this.articleService.updateArticle(article);

    }).catch((error) => {
      console.log('error', error);
    });
  }

  directorySelectHandler(event: { id: string, folder: string }) {
    console.log('directorySelectHandler : ~~> %o ', event);
    let article = this.articleService.getArticleById(event.id)!;
    article.directory = event.folder;
    // this.updateArticle(article);  // will force editor reload
  }

  directoryValidated(article: Article) {
    // console.log('validateDirectory : %o ', article);
    this.removeEditors(article);
    this.current_article = null;  // deselct article
    this.updateArticle(article);
  }




  // C(R)UD ARTICLES

  createArticle(layout: Layout) {
    // create dummy article
    const article: CreateArticleInput = {
      title: this.current_page.label + '/' + layout + (this.maxRank + 1),
      headline: '<h2> Le titre </h2>',
      layout: layout,
      body: '<div class="editable"> <div style="float: left;margin-top:0.5em;margin-right:1em;"><img src="../assets/images/bcsto.jpg" style="width:10rem" alt="bcsto"></div><div> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras pellentesque ullamcorper libero non pretium. Sed facilisis nisl nec interdum interdum. Fusce eu lorem quis ante ultrices vehicula ultrices et nunc. Fusce ac velit felis. Aenean faucibus, dolor eget convallis lobortis, mauris sapien porttitor urna, ac dapibus massa velit eu ante. Etiam molestie tincidunt purus a maximus. Nulla sed vehicula metus, non malesuada diam. Nunc imperdiet metus a tellus tincidunt, eget tincidunt augue blandit. Etiam ut tellus enim.</div></div>',
      date: new Date().toISOString(),
      rank: this.maxRank + 1,
      // public: true,
      pageId: this.current_page.id,
      directory: environment.S3articlesDirectory
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


  createPicture(filename: string, article: Article, rankOffset: number) {
    let max = 0;
    if (article.pictures) {
      console.log('createPicture : article.pictures = %o', article.pictures)
      max = article.pictures.items.reduce(
        (max, item) => (item!.rank > max) ? item!.rank : max,
        0,
      );
    }
    const picture: CreatePictureInput = {
      filename: filename,
      caption1: '',
      caption2: '',
      orientation: PictureOrientationTypeEnum.Italian,
      rank: max + 1 + rankOffset,
      articleId: article.id,
    };
    this.pictureService.createPicture(picture);


  }

  // updatePicture() {
  // }

  deletePicture(picture: Picture) {
    this.pictureService.deletePicture(picture);
  }

  pictureClickHandler(event: { op: PictureOp, id: string, co_id: string }) {
    // console.log('pictureClickHandler : %o', event);
    switch (event.op) {
      case 'Delete':
        this.deletePicture(this.pictureService.sgetPicture(event.id));
        break;
      case 'Edit':
        const modalRef = this.modalService.open(GetPictureInfoComponent, { centered: true });
        modalRef.componentInstance.picture = this.pictureService.sgetPicture(event.id);

        modalRef.result.then((picture) => {
          console.log('result', picture);
          this.pictureService.updatePicture(picture);

        }).catch((error) => {
          console.log('error', error);
        });
        break;
      case 'Left':
      case 'Right':
        const picture = this.pictureService.sgetPicture(event.id);
        const co_picture = this.pictureService.sgetPicture(event.co_id);
        const tmp = picture.rank;
        picture.rank = co_picture.rank;
        co_picture.rank = tmp;
        this.pictureService.updatePicture(picture);
        this.pictureService.updatePicture(co_picture);
        break;
      default:
        console.log('editPicture : unknown op %s', event.op);
        break;
    }

  }

  // picture files upload
  pictureUpload(event: any, article: Article) {
    const files = Array.from(event.target.files) as File[];
    if (files === undefined) { return; }
    // console.log('pictureUpload : %o', files);

    function uploadPromise(key: string, file: File): Promise<any> { { return Storage.put(key, file, { level: 'public' }) } };

    // S3 files uploading
    let uploadPromises: Promise<any>[] = [];
    files.forEach((file: any) => {
      const key = environment.S3filesDirectory + article.title + '/' + file.name;
      uploadPromises.push(uploadPromise(key, file))
    });
    Promise.all(uploadPromises)
      .then(() => {
        // create associated pictures within dynamodb
        files.forEach((file: any, index: number) => {
          const key = environment.S3filesDirectory + article.title + '/' + file.name;
          this.createPicture(key, article, index);
        });
      })
      .catch((err) => {
        console.log('setPictures : S3 error:%o ', err);
        this.toastService.showErrorToast('Error uploading pictures', err);
      });
  }


  // tinyMCE


  cardClickHandler(article: Article) {

    // console.log('cardClickHandler : %s , force_editor_reload : %s', article.id, this.force_editor_reload);

    if (this.current_article !== null) {
      if ((this.current_article.id === article.id)) {   // if same article
        if (this.force_editor_reload) {
          // console.log('cardClickHandler : regenerate editors on same article');
          this.removeEditors(article);                       // remove & reload editors on explicit need
        } else {
          // console.log('cardClickHandler : same article, no need to reload editors');
          return;                                            // otherwise no need to remove & reload editors
        }
      } else {                                        // if different article
        // console.log('cardClickHandler : different article, remove editors on previous article');
        this.removeEditors(this.current_article);         //  remove editors on previous article
      }
    } else {
      // console.log('cardClickHandler : no previous article, nothing to remove');
    }

    this.force_editor_reload = false;
    this.current_article = article;
    //                                           problème potentiel de timing !!!!
    // leave time for the DOM to be updated
    // setTimeout(() => {
    //   this.openEditors(article);
    //   console.log('leave time for the DOM to be updated');
    // }, 100);
    this.openEditors(article);

    // });
  }


  openEditors(article: Article) {

    // console.log('openEditors : %s', article.id);

    const el_head = document.getElementById('headArea' + article.id);
    if (el_head === null) { console.log('edit_mode set to true but el_head not found !!!'); return; }
    this.initHeadLineEditor(el_head);

    if (article.layout === 'Textual') {
      const el_body = document.getElementById('bodyArea' + article.id);
      if (el_body === null) { console.log('edit_mode set to true but el_body not found !!!'); return; }
      this.initBodyEditor(el_body);
    }
  }

  removeEditors(article: Article) {
    tinymce.EditorManager.remove('#headArea' + article.id);
    // console.log('removing headArea editor');

    if (article.layout === 'Textual') {
      // console.log('removing bodyArea editor');
      tinymce.EditorManager.remove('#bodyArea' + article.id);
    }
  }

  headSave(html: SafeHtml): void {
    this.current_article!.headline = html.toString();
    this.updateArticle(this.current_article!);


  }

  bodySave(html: SafeHtml): void {
    const BucketName = environment.BucketName;
    const Region = environment.Region;
    const hostname = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com';
    this.current_article!.body = html.toString().replaceAll(hostname, 'https://HOSTNAME');
    this.updateArticle(this.current_article!);
  }

  initHeadLineEditor(el: HTMLElement) {
    // console.log('initHeadLineEditor : %o', el);
    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        plugins: ' code  wordcount save',
        toolbar: 'undo redo blocks | bold italic | forecolor | code | save cancel',
        save_onsavecallback: () => { this.headSave(tinymce.activeEditor!.getContent()); },
        toolbar_location: 'bottom',
        valid_elements: 'p[style],h*,strong,em,span[style]',
        valid_styles: { '*': 'font-size,font-family,color,text-decoration,text-align' }
      }).then((editors) => {
        if (editors.length === 0) {
          console.log('initHeadLineEditor failed with', el);
        }
        // else { console.log('initHeadLineEditor  initialised'); }
      });
  }

  initBodyEditor(el: HTMLElement) {

    tinymce.init(
      {
        target: el,
        inline: false,

        // content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        // editable_root: false,
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

        images_upload_handler: (blobInfo: { filename: () => string; blob: () => any; }): Promise<string> => {
          // console.log('image_upload_handler : ', blobInfo.filename(), blobInfo.blob());

          const buildURL = (key: string) => {
            const BucketName = environment.BucketName;
            const Region = environment.Region;
            const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;
            return uri;
          };

          let promise: Promise<string> = new Promise((resolve, reject) => {
            const key = 'images/' + this.current_article!.title + '/' + blobInfo.filename();
            Storage.put(key, blobInfo.blob(), {
              level: 'public',
              // contentType: blobInfo.blob().type,
              progressCallback(progress: any) {
                // console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
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
        },

        image_caption: true,
      }).then((editors) => {
        // console.log('initBodyEditor : %s editors initialised', editors.length);
        if (editors.length === 0) console.log('initBodyEditor failed on', el);
      });
  }


  ImagePickerCallback(cb: (blobUri: string, arg1: { title: string; }) => void, value: any, meta: any): void {
    // create an off-screen canvas
    const canvas = document.createElement('canvas');

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const id = file.name;  //+ (new Date()).getTime();
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
