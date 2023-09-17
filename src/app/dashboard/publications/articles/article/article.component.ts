import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { Location } from '@angular/common';
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

  // fileChanged: boolean = false;
  selectedCategoryId: string = '';
  // selectedCategory!: Category | undefined;
  // currentArticleId: string = '';
  selectedArticle!: Article | undefined;
  formMode: 'create' | 'update' = 'create'

  createdArticle !: Article;

  formStatus: string[] = ['Création d\' article', 'créer un nouvel article'];

  articleForm!: FormGroup;

  get fcontrols() {
    return this.articleForm.controls;
  }

  get bodyControl() { return this.articleForm.get('body') as FormControl; }
  // get content() { return this.articleForm.get('content')?.value; }


  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    // private fileService: FileService,
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private safeHtmlPipe: SafeHtmlPipe
  ) { }



  async ngOnInit(): Promise<void> {

    this.initForm();
    const article = this.articleService.readArticle(this.id)
      .then((article) => {
        this.setForm(article!);
        this.selectedArticle = article;
      })
      .catch((error) => { console.log('error : ', error); return undefined; });
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
    // console.log('%s sanitized ~> %s', body, sanitized);
    // this.bodyControl.patchValue(sanitized);
    const article = this.articleForm.value as Article;
    article.body = sanitized as string;
    // console.log('createArticle :', article);

    if (this.formMode === 'create') {
      this.articleService.createArticle(article);
    } else {
      // mode 'update'
      article.id = this.id;
      article.categoryId = this.selectedCategoryId;
      this.articleService.updateArticle(article);
    }

    this.router.navigate(['dashboard/articles']);
  }



  initForm() {

    this.articleForm = new FormGroup({
      // category: new FormControl(null, Validators.required),
      title: new FormControl('titre', [Validators.required, Validators.minLength(1)]),
      body: new FormControl('', Validators.required),
      summary: new FormControl('résumé', [Validators.minLength(5)]),
      categoryId: new FormControl(''),
      published: new FormControl(false, Validators.required),
      featured: new FormControl(false, Validators.required)

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

    this.formStatus = ['Modification d\'un article', 'modifier cet article'];;
    this.formMode = 'update';
  }
  navBack() {
    this.location.back();
  }
}
function RouteParam(): (target: ArticleComponent, propertyKey: "id") => void {
  throw new Error('Function not implemented.');
}

