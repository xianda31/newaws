import { Component, Input, OnInit, SecurityContext, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
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
export class ArticleComponent implements OnInit {

  @Input() id: string = '';// @RouteParam()


  categories$: Observable<Category[]> = this.categoryService.categories$ as Observable<Category[]>;
  articles$: Observable<Article[]> = this.articleService.articles$ as Observable<Article[]>;
  imgBuffer!: any;
  preview !: string;

  // selectedFile!: File;

  selectedCategoryId: string = '';
  selectedArticle!: Article | undefined;
  templateLoaded: boolean = false;

  formMode: 'create' | 'update' = 'create'
  formStatus: string[] = ['Création d\' article', 'créer un nouvel article'];
  // HtmlContent: string = '';

  bannerFile!: File;
  bannerChanged: boolean = false;
  bannerPreview: string = '';

  articleForm!: FormGroup;

  get fcontrols() {
    return this.articleForm.controls;
  }

  get bannerControl() { return this.articleForm.get('banner') as FormControl; }
  get bannerValue() { return this.bannerControl.value; }


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private fileService: FileService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,

  ) { }

  async ngOnInit(): Promise<void> {

    // console.log("ngOnInit", this.id);

    this.initForm();


    if (this.id !== undefined) {

      // initialisation du formulaire avec les valeurs de l'article[id] à modifier
      this.formStatus = ['Modification d\'un article', 'modifier cet article'];
      this.formMode = 'update';

      this.articleService.readArticle(this.id)
        .then(async (article) => {
          this.setForm(article!);
          this.selectedArticle = article;

          const filename = 'articles/' + article!.permalink;
          const blob = await Storage.get(filename, { download: true });
          blob.Body?.text().then((text) => {
            this.tinymceInit(text);
          });

          this.imgBuffer = await Storage.get('banners/' + article.banner, { validateObjectExistence: true });

          //  {
          //   this.getImage64(this.selectedFile).then((image64) => {
          //     this.imgBuffer = image64;
          //     this.bannerControl.patchValue(this.selectedFile.name);
          //   });
          // }

        })
        .catch((error) => { console.log('error : ', error); return undefined; });

    } else {

      // initialisation du formulaire avec des valeurs "vides" et le template pour le HTML de l'article
      this.formStatus = ['Création d\' article', 'créer un nouvel article'];
      this.formMode = 'create';

      this.http.get('assets/html-templates/template_A.html', { responseType: 'text' }).subscribe(
        data => {
          this.tinymceInit(data);
        }
      );
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


    if (this.formMode === 'create') {
      // mode 'create'
      article.permalink = this.articleForm.get('title')?.value.toLowerCase().replace(/\s/g, '-');

      const filename = 'articles/' + article.permalink;
      if (await this.UploadTxtFile(filename, HTMLtext)) {
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
      console.log("banner changed")
      await this.fileService.uploadFile('banners/' + this.bannerFile.name, this.bannerFile);
      console.log("banner uploaded")
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
      categoryId: new FormControl(''),
      assigned: new FormControl(true),
      featured: new FormControl(false),
      public: new FormControl(true),

    });

  }

  setForm(article: Article) {

    this.articleForm.get('categoryId')?.patchValue(article.categoryId);
    this.selectedCategoryId = article.categoryId!;
    this.articleForm.get('title')?.setValue(article.title);
    this.articleForm.get('permalink')?.setValue(article.permalink);
    this.articleForm.get('summary')?.setValue(article.summary);
    this.articleForm.get('assigned')?.setValue(article.assigned);
    this.articleForm.get('featured')?.setValue(article.featured);
    this.articleForm.get('public')?.setValue(article.public);
    this.articleForm.get('banner')?.setValue(article.banner);


  }
  navBack() {
    this.location.back();
  }

  // ********* configuration tinymce ***********
  tinymceInit(initialContent: string) {
    tinymce.init({
      selector: "textarea#myTextarea",
      setup: (editor) => {
        editor.on('init', () => {
          editor.setContent(initialContent);
          console.log("initial Content loaded... ");
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


  // async onBannerSelected(event: any) {
  //   this.bannerFile = event.target.files[0];
  //   this.bannerChanged = true;
  //   if (this.bannerFile) {
  //     this.bannerPreview = await this.getImage64(this.bannerFile);
  //     const filename = this.bannerFile.name;
  //     this.bannerControl.patchValue(filename);
  //   }
  // }

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

  // async uploadBannerImage() {

  //   if (await this.checkFileExistence() === true) {
  //     console.log('file already exists');
  //     return;
  //   }

  //   try {
  //     const result = await Storage.put(this.filename, this.file, {
  //       // contentType: "image/png",  contentType is optional
  //       level: 'public'
  //     });
  //   } catch (error) { console.log("Error uploading file: ", error); }
  // }

  // async checkFileExistence(): Promise<boolean> {
  //   try {
  //     await Storage.get(this.filename, { validateObjectExistence: true });
  //     return true;
  //   }
  //   catch (error) {
  //     return false;
  //   }
  // }

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

