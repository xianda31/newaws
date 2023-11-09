import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Article, Page } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { Location } from '@angular/common';
import { Storage } from 'aws-amplify/lib-esm';
import { HttpClient } from '@angular/common/http';
import tinymce from 'tinymce';
import { FileService } from 'src/app/tools/service/file.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {

  @Input() id: string = '';// @RouteParam()


  creationMode!: boolean;

  pages$: Observable<Page[]> = this.pageService.pages$ as Observable<Page[]>;
  articles$: Observable<Article[]> = this.articleService.articles$ as Observable<Article[]>;
  imgBuffer!: any;
  preview !: string;

  // selectedFile!: File;

  selectedPageId: string = '';
  selectedArticle!: Article | undefined;
  templateLoaded: boolean = false;

  bannerFile!: File;
  bannerChanged: boolean = false;
  bannerPreview: string = '';
  externalHtml: string = '';

  articleForm!: FormGroup;

  get fcontrols() {
    return this.articleForm.controls;
  }

  get bannerControl() { return this.articleForm.get('banner') as FormControl; }
  get bannerValue() { return this.bannerControl.value; }


  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private fileService: FileService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,

  ) { }
  ngOnDestroy(): void {
    tinymce.remove();
    // console.log("tinymce removed");
  }


  async ngOnInit(): Promise<void> {
    // console.log("ngOnInit", this.id);
    this.creationMode = (!this.id);

    this.initForm();

    if (this.creationMode) {
      this.http.get('assets/html-templates/template_A.html', { responseType: 'text' }).subscribe(
        html => {
          this.externalHtml = html;
          this.tinymceInit(this.externalHtml);
        }
      );
    } else {

      // initialisation du formulaire avec les valeurs de l'article[id] à modifier

      this.articleService.readArticle(this.id)
        .then(async (article) => {
          this.setForm(article!);
          this.selectedArticle = article;

          const filename = 'articles/' + article!.permalink;
          const blob = await Storage.get(filename, { download: true });

          blob.Body?.text().then(async (text) => {
            this.externalHtml = text;
            this.tinymceInit(text);
          });

          this.imgBuffer = await Storage.get('banners/' + article.banner, { validateObjectExistence: true });

        })
        .catch((error) => { console.log('error : ', error); return undefined; });
    }


  }

  async UploadTxtFile(filename: string, text: string) {
    const blob = new Blob([text], { type: 'text/plain' });
    const file = new File([blob], 'test.txt', { type: 'text/plain' });
    return await this.fileService.uploadFile(filename, file);
  }


  async saveArticle() {

    const article = this.articleForm.getRawValue() as Article;   // getRawValue() pour récupérer les valeurs des champs disabled

    const HTMLtext = tinymce.activeEditor!.getContent();
    tinymce.remove();
    this.navBack();


    if (this.creationMode) {
      // mode 'create'
      article.permalink = this.articleForm.get('title')?.value.toLowerCase().replace(/\s/g, '-');

      const filename = 'articles/' + article.permalink;
      if (await this.UploadTxtFile(filename, HTMLtext)) {
        console.log('gonna save %o', article);
        this.articleService.createArticle(article);
      } else {
        console.log("error uploading html file");
      };

    } else {

      // mode 'update'
      article.id = this.id;

      const filename = 'articles/' + article.permalink;
      if (await this.UploadTxtFile(filename, HTMLtext)) {
        this.articleService.updateArticle(article);
      } else {
        console.log("error uploading html file");
      };
    }

    if (this.bannerChanged) {
      await this.fileService.uploadFile('banners/' + this.bannerFile.name, this.bannerFile);
      this.router.navigate(['dashboard/articles']);
    }
  }

  onTitleChanged(event: any) {
    const title = event.target.value;
    const permalink = title.toLowerCase().replace(/\s/g, '-');
    this.articleForm.get('permalink')?.setValue(permalink);
  }

  initForm() {
    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      permalink: new FormControl(''),
      banner: new FormControl({ value: '', disabled: true }),
      summary: new FormControl('', [Validators.minLength(2)]),
      pageId: new FormControl(''),
      featured: new FormControl(false),
      public: new FormControl(true),

    });

  }

  setForm(article: Article) {

    this.articleForm.get('pageId')?.patchValue(article.pageId);
    this.selectedPageId = article.pageId!;
    this.articleForm.get('title')?.setValue(article.title);
    this.articleForm.get('permalink')?.setValue(article.permalink);
    this.articleForm.get('summary')?.setValue(article.summary);
    this.articleForm.get('featured')?.setValue(article.featured);
    this.articleForm.get('public')?.setValue(article.public);
    this.articleForm.get('banner')?.setValue(article.banner);


  }
  navBack() {
    this.router.navigate(['dashboard/publisher/articles']);
    // this.location.back();
  }

  // ********* configuration tinymce ***********
  tinymceInit(initialContent: string) {
    if (!initialContent) console.log("initialContent is empty");

    tinymce.init({
      selector: "textarea#myTextarea",
      setup: (editor) => {

        editor.on('init', () => {
          editor.setContent(initialContent);
          this.templateLoaded = true;

        });
      },
      plugins: 'preview searchreplace  autolink autosave save' +
        ' code visualblocks visualchars' +
        ' fullscreen image table  pagebreak nonbreaking advlist lists wordcount ',
      toolbar: // 'undo redo |' + 
        'table code |' +
        ' bold italic underline strikethrough |' +
        'fontfamily fontsize blocks |' +
        ' alignleft aligncenter alignright alignjustify |' +
        'outdent indent pagebreak | ' +
        'numlist bullist | ' +
        'forecolor backcolor removeformat |' +
        'fullscreen  preview ' +
        ' insertfile image template link ',

      height: '700px',
      format: 'html',
      content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
      editable_root: false,
      editable_class: 'editable',

      file_picker_callback: this.ImagePickerCallback,
      image_caption: true,

    });

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
        const id = 'blobid' + (new Date()).getTime();
        const image64 = e.target.result;
        const blobCache = tinymce.activeEditor!.editorUpload.blobCache;
        const base64 = image64.split(',')[1];

        // const img = new Image();
        // img.onload = () => {
        //   canvas.width = img.width / 2;
        //   canvas.height = img.height / 2;
        //   console.log("img.width : ", img.width);
        //   ctx!.drawImage(img, 0, 0, img.width, img.height);
        //   const compressed64 = canvas.toDataURL();
        //   console.log("compressed64 : ", compressed64);
        // }


        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);
        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };

      reader.readAsDataURL(file);
    });

    input.click();
  }



  // ************ gestion image (banner)******************



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

  onFileSelected(event: any) {
    this.bannerFile = event.target.files[0];

    if (this.bannerFile) {
      this.getImage64(this.bannerFile).then((image64) => {
        this.imgBuffer = image64;
        this.bannerControl.patchValue(this.bannerFile.name);
        this.bannerChanged = true;
      });
    }

  }

}

