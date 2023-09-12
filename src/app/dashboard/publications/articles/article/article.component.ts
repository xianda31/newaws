import { Component, OnInit, SecurityContext } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject, combineLatest, forkJoin, merge } from 'rxjs';
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


  categories$: Observable<Category[]> = this.categoryService.categories$ as Observable<Category[]>;
  articles$: Observable<Article[]> = this.articleService.articles$ as Observable<Article[]>;
  imgBuffer!: any;

  selectedFile!: File;

  fileChanged: boolean = false;
  selectedCategoryId: string = '';
  selectedCategory!: Category | undefined;
  currentArticleId: string = '';
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



  ngOnInit(): void {

    this.initForm();

    combineLatest([this.route.queryParams, this.articleService.articles$, this.categoryService.categories$]).subscribe(([params, articles, categories]: [Params, Article[], Category[]]) => {
      if (params['id'] && articles.length && categories.length) {
        const article = this.articleService.getArticleById(params['id']);
        if (!article) {
          // this.selectedCategory = article.categoryArticlesId? as Category;
          this.setForm(article!);
        } else {
          console.error('article not found');
        };
      };
    });
  }


  // onTitleChange(event: any) {
  //   const title = event.target.value;
  //   this.permalink = title.toLowerCase().replace(/\s/g, '-');
  //   this.articleForm.patchValue({ permalink: this.permalink });

  // }

  config = {
    ADD_ATTR: ['height', 'width', 'alt', 'src', 'style', 'title'],
    ADD_TAGS: [],
    ADD_URI_SAFE_ATTR: ['href'],
  }

  createArticle() {

    const body = this.bodyControl.value;
    const sanitized = DOMPurify.sanitize(body, this.config);
    if (DOMPurify.removed.length > 0) {
      console.log("DOMsanitizer has removed %s tags ", DOMPurify.removed.length);
    }
    // console.log('%s sanitized ~> %s', body, sanitized);
    // this.bodyControl.patchValue(sanitized);
    const article = this.articleForm.value as Article;
    article.body = sanitized as string;
    // console.log('createArticle :', article);
    this.articleService.createArticle(article);

    this.router.navigate(['dashboard/articles']);
  }



  initForm() {

    this.articleForm = new FormGroup({
      // category: new FormControl(null, Validators.required),
      title: new FormControl('titre', [Validators.required, Validators.minLength(1)]),
      body: new FormControl('', Validators.required),
      summary: new FormControl('résumé', [Validators.minLength(5)]),
      // id: new FormControl(''),
      // permalink: new FormControl(''),
      // imgPath: new FormControl('', Validators.required),
      categoryId: new FormControl(''),
      isPublished: new FormControl(false, Validators.required)

    });

  }

  setForm(article: Article) {

    // this.selectedCategoryId = article.categoryArticlesId as string;
    // this.imgSrc = article.imgPath;
    // console.log('setForm ; image :', this.imgSrc);
    // this.articleForm.get('id')?.setValue(article.id);
    // // this.articleForm.get('category')?.patchValue(article.categoryId);
    // this.articleForm.get('title')?.setValue(article.title);
    // this.articleForm.get('permalink')?.setValue(article.permalink);
    // this.articleForm.get('body')?.setValue(article.body);
    // // this.articleForm.get('imgPath')?.setValue(article.imgPath);
    // this.articleForm.get('summary')?.setValue(article.summary);
    // this.articleForm.get('isPublished')?.setValue(article.isPublished);

    // this.formStatus = ['Modification d\'un article', 'modifier cet article'];;
    // this.formMode = 'update';
  }
  navBack() {
    this.location.back();
  }
}
