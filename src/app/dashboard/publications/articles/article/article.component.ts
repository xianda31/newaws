import { Component, Input, OnInit, SecurityContext, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { Location } from '@angular/common';
import { Storage } from 'aws-amplify/lib-esm';
import * as DOMPurify from 'dompurify';
import { HttpClient } from '@angular/common/http';
// import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import tinymce from 'tinymce';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, AfterViewInit {

  @Input() id: string = '';// @RouteParam()

  categories$: Observable<Category[]> = this.categoryService.categories$ as Observable<Category[]>;
  articles$: Observable<Article[]> = this.articleService.articles$ as Observable<Article[]>;
  imgBuffer!: any;

  selectedFile!: File;

  selectedCategoryId: string = '';
  selectedArticle!: Article | undefined;
  formMode: 'create' | 'update' = 'create'
  formStatus: string[] = ['Création d\' article', 'créer un nouvel article'];
  // HtmlContent: string = '';


  articleForm!: FormGroup;

  get fcontrols() {
    return this.articleForm.controls;
  }

  get bodyControl() { return this.articleForm.get('body') as FormControl; }
  get bannerControl() { return this.articleForm.get('banner') as FormControl; }
  get bannerValue() { return this.bannerControl.value; }


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    // private fileService: FileService,
    private router: Router,
    private location: Location,
    private http: HttpClient,
    // private sanitizer: DomSanitizer,

  ) { }
  ngAfterViewInit(): void {

  }

  async ngOnInit(): Promise<void> {

    // console.log("ngOnInit", this.id);

    this.initForm();


    if (this.id !== undefined) {
      // initialisation du formulaire avec les valeurs de l'article[id] à modifier
      this.formStatus = ['Modification d\'un article', 'modifier cet article'];
      this.formMode = 'update';
      this.articleService.readArticle(this.id)
        .then((article) => {
          this.setForm(article!);
          this.selectedArticle = article;
          // this.HtmlContent = article!.body;
          // console.log("loading article with body : ", article!.body);
          this.tinymceInit(article!.body);
          // const strg = tinymce.activeEditor!.selection.setContent(article!.body, { format: 'text' });
          // console.log("strg : ", strg);
        })
        .catch((error) => { console.log('error : ', error); return undefined; });

    } else {

      // initialisation du formulaire avec des valeurs "vides" et le template pour le body de l'article
      this.formStatus = ['Création d\' article', 'créer un nouvel article'];
      this.http.get('assets/html-templates/template_A.html', { responseType: 'text' }).subscribe(
        data => {
          // this.HtmlContent = data;
          this.tinymceInit(data);
          // this.HtmlContent = this.sanitizer.bypassSecurityTrustHtml(data);
          // this.tinymceInit();
        }
      );
    }


  }




  async saveArticle() {

    const article = this.articleForm.getRawValue() as Article;   // getRawValue() pour récupérer les valeurs des champs disabled
    const body = tinymce.activeEditor!.getContent();
    tinymce.remove();
    article.body = body;
    console.log("saving article.body : ", article.body);

    if (this.formMode === 'create') {
      this.articleService.createArticle(article);
    } else {
      // mode 'update'
      article.id = this.id;
      this.articleService.updateArticle(article);
    }

    this.uploadBannerImage();
    this.router.navigate(['dashboard/articles']);
  }



  initForm() {

    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      body: new FormControl(''),
      banner: new FormControl({ value: '', disabled: true }),
      summary: new FormControl('', [Validators.minLength(2)]),
      categoryId: new FormControl(''),
      published: new FormControl(true),
      featured: new FormControl(false),
      public: new FormControl(true),

    });

  }

  setForm(article: Article) {

    this.articleForm.get('categoryId')?.patchValue(article.categoryId);
    this.selectedCategoryId = article.categoryId!;
    this.articleForm.get('title')?.setValue(article.title);
    this.articleForm.get('body')?.setValue(article.body);
    this.articleForm.get('summary')?.setValue(article.summary);
    this.articleForm.get('published')?.setValue(article.published);
    this.articleForm.get('featured')?.setValue(article.published);
    this.articleForm.get('public')?.setValue(article.published);
    this.articleForm.get('banner')?.setValue(article.banner);


  }
  navBack() {
    this.location.back();
  }

  // ********* configuration tinymce ***********
  tinymceInit(initialContent: string) {
    console.log("tinymceInit");
    // return
    tinymce.init({
      selector: "textarea#myTextarea",
      setup: (editor) => {
        editor.on('init', () => {
          editor.setContent(initialContent);
        });
      },
      plugins: "preview code  searchreplace autolink autosave save directionality  visualblocks visualchars fullscreen image  media  codesample  table charmap pagebreak nonbreaking anchor  lists  wordcount ",
      height: '800px',
      format: 'html',
      content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
      // skin: 'bootstrap',
      // toolbar_sticky: true,
      // linkchecker_service_url: 'http://mydomain.com/linkchecker',
      // autosave_restore_when_empty: true,
      editable_root: false,
      editable_class: 'editable',
    });

  }
  // ************ gestion image ******************
  filename: string = '';
  file!: File;
  preview: string = '';

  async onFileSelected(event: any) {
    this.file = event.target.files[0];
    if (this.file) {
      this.preview = await this.getImage64(this.file);
      this.filename = 'banners/' + this.file.name;
      this.bannerControl.patchValue(this.filename);

    }
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

  async uploadBannerImage() {

    if (await this.checkFileExistence() === true) {

      console.log('file already exists');
      return;
    }

    try {
      const result = await Storage.put(this.filename, this.file, {
        // contentType: "image/png",  contentType is optional
        level: 'public'
      });
    } catch (error) { console.log("Error uploading file: ", error); }
  }

  async checkFileExistence(): Promise<boolean> {
    try {
      await Storage.get(this.filename, { validateObjectExistence: true });
      return true;
    }
    catch (error) {
      return false;
    }
  }


}

