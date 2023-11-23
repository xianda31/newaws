import { AfterViewInit, Component, OnInit, QueryList, ViewChildren, Sanitizer } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Article, CreateArticleInput } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { FlashData } from 'src/app/layouts/pager/plugins/flash-plugin/flash-plugin.interface';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import tinymce from 'tinymce';
import { FileService } from 'src/app/tools/service/file.service';
import { environment } from 'src/app/environments/environment';


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
  body !: string;
  // body: string = '';

  // articles$: Observable<Article[]> = this.articleService.articles$;
  createForm !: FormGroup;
  // imageURL!: any;
  // article !: Article;

  article0: CreateArticleInput = {
    title: 'pierre gros',
    permalink: 'pierre-gros',
    headline: '<p>headline<\p>',
    body: '<div class="editable"> blblabla   </div>',

    // permalink: '',
    public: true,
    rank: 0,
    pageId: '64a54318-fb22-4dc1-8cad-6b6f738f0689',
    image_url: 'avatar-2092113_640.png',
    info: '2024-01-01',
  }

  constructor(
    private articleService: ArticleService,
    private sanitizer: DomSanitizer,
    public fileService: FileService,
  ) { }

  ngAfterViewInit(): void {
    this.initHeadLineEditor()

    this.bodyArea.changes.subscribe((r) => {
      if (this.showMore && this.editBody) {
        this.removeBodyEditor();   // au cas ou il existe déjà  
        this.initBodyEditor()
      }
    });

  }

  async ngOnInit(): Promise<void> {

    this.initForm();

    // chargement article0
    this.createForm.patchValue(this.article0);
    const article = this.createForm.getRawValue() as Article;
    this.triggerView(article);

  }


  initForm() {
    this.createForm = new FormGroup({

      // management data
      title: new FormControl(''),
      permalink: new FormControl({ value: '', disabled: true }),   // equivalent to title ... replace ?
      public: new FormControl(''),
      pageId: new FormControl(''),
      rank: new FormControl(0),

      // content data
      image: new FormControl(''),
      headline: new FormControl(''),
      body: new FormControl(''),
      image_url: new FormControl(''),    //  image_url -> S3
      info: new FormControl(''),   // date-like string OR '' (no date)

    });


  }


  toggleEditBody() {
    // si editBody = true on force showMore à true s'il ne l'etait pas déjà (et on init l'éditeur)
    if (this.editBody && !this.showMore) {
      // console.log('deploiement du body');
      this.showMore = true;
      return;
    }
    if (this.editBody && this.showMore) {
      // console.log('cas2 : déplié et demande d\'édition');
      this.initBodyEditor();
      return;
    }
    if (!this.editBody && this.showMore) { this.removeBodyEditor(); }
  }

  // plugin adds

  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }


  // services 

  triggerView(article: Article): void {
    const flashData: FlashData = {
      title: article.title,
      image: this.buildURL('images/' + article.image_url),
      headline: article.headline,
      body: article.body ?? ' ', //this.getHTMLcontent$('articles/' + article.body),
      date: article.info ? new Date(article.info) : null,
    };
    this.data = flashData;
  }

  buildURL(key: string): string {
    const BucketName = 'bcstoapp0ee6a242edb74c79a78263aa5cb1473e113936-dev';
    const Region = 'eu-west-3';
    const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;
    return uri;
  }

  // tinymce editor services


  bodySave(html: SafeHtml): void {
    this.article0.body = html.toString();
    this.createForm.patchValue({ body: this.article0.body });
    this.data.body = html.toString();  //this.sanitizer.bypassSecurityTrustHtml(this.body as string);
    console.log('bodySave %s bytes', this.data.body.length);
  }
  headSave(html: SafeHtml): void {
    this.article0.headline = html as string;
    this.createForm.patchValue({ head_html: this.article0.headline });
    this.data.headline = html.toString();
    console.log('headSave %s bytes', this.data.headline.length);

  }

  initHeadLineEditor() {
    const el = document.getElementById('headArea');
    if (el === null) {
      console.log('el not found');
      return;
    }
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
      });
  }


  initBodyEditor() {
    const el = document.getElementById('bodyArea');

    if (el === null) { console.log('el not yet found ....'); return; }

    this.editorExist = true;

    tinymce.init(
      {
        target: el,
        inline: false,

        content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
        editable_root: false,
        editable_class: 'editable',

        plugins: 'anchor autolink link lists image code save wordcount table',  //
        menubar: 'file edit table insert view format tools',
        toolbar: 'undo redo save | table | blocks | bold italic strikethrough backcolor | mergetags | link image | align bullist numlist | code ',
        table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
        toolbar_location: 'bottom',

        save_onsavecallback: () => {
          // tinymce.activeEditor!.uploadImages();
          let content = tinymce.activeEditor!.getContent();
          this.bodySave(content);
        },

        file_picker_callback: (callback, value, meta) => { this.ImagePickerCallback(callback, value, meta) },

        images_upload_handler: this.image_upload_handler,

        image_caption: true,
      });
  }

  image_upload_handler(blobInfo: { filename: () => string; blob: () => any; }, progress: any): Promise<string> {

    console.log('image_upload_handler : blobInfo:%o ', blobInfo);

    const buildURL = (key: string) => {
      const BucketName = environment.BucketName;
      const Region = environment.Region;
      const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;
      return uri;
    };

    let promise: Promise<string> = new Promise((resolve, reject) => {
      const key = 'images/' + blobInfo.blob().name;
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

  ImagePickerCallback(cb: (arg0: string, arg1: { title: string; }) => void, value: any, meta: any): void {
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
        const id = this.article0.permalink + '/' + file.name; // + (new Date()).getTime();
        const image64 = e.target.result;
        const blobCache = tinymce.activeEditor!.editorUpload.blobCache;
        const base64 = image64.split(',')[1];


        console.log('ImagePickerCallback : sauvegarde en cache de %o, sous reference id %s', file, id);
        const blobInfo = blobCache.create(id, file, base64, id, id);
        blobCache.add(blobInfo);
        /* call the callback and populate the Title field with the file name */
        console.log('ImagePickerCallback : appel du callback avec blobUri %s et title: %s', blobInfo.blobUri(), id);
        cb(blobInfo.blobUri(), { title: id });
      };

      reader.readAsDataURL(file);
    });

    input.click();

  }



  removeBodyEditor() {
    if (this.editorExist) {
      tinymce.remove('#bodyArea');
      this.editorExist = false;
    }
  }

}

