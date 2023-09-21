import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { Location } from '@angular/common';
import { Storage } from 'aws-amplify/lib-esm';
import * as DOMPurify from 'dompurify';


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

  selectedFile!: File;

  selectedCategoryId: string = '';
  selectedArticle!: Article | undefined;
  formMode: 'create' | 'update' = 'create'
  formStatus: string[] = ['Création d\' article', 'créer un nouvel article'];


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
  ) { }

  async ngOnInit(): Promise<void> {

    this.initForm();
    if (this.id !== undefined) {
      this.articleService.readArticle(this.id)
        .then((article) => {
          this.setForm(article!);
          this.selectedArticle = article;
          this.formStatus = ['Modification d\'un article', 'modifier cet article'];;
          this.formMode = 'update';
        })
        .catch((error) => { console.log('error : ', error); return undefined; });
    }
  }


  DOMPurifyconfig = {
    ADD_ATTR: ['height', 'width', 'alt', 'src', 'style', 'title'],
    ADD_TAGS: [],
    ADD_URI_SAFE_ATTR: ['href'],
  }


  async saveArticle() {

    const body = this.bodyControl.value;
    const sanitized = DOMPurify.sanitize(body, this.DOMPurifyconfig);
    if (DOMPurify.removed.length > 0) {
      console.log("DOMsanitizer has removed %s tags ", DOMPurify.removed.length);
    }
    const article = this.articleForm.getRawValue() as Article;   // getRawValue() pour récupérer les valeurs des champs disabled
    article.body = sanitized as string;


    if (this.formMode === 'create') {
      this.articleService.createArticle(article);
    } else {
      // mode 'update'
      article.id = this.id;
      // article.categoryId = this.selectedCategoryId;
      this.articleService.updateArticle(article);
    }

    this.uploadBannerImage();

    this.router.navigate(['dashboard/articles']);
  }



  initForm() {

    this.articleForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      body: new FormControl('', Validators.required),
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

