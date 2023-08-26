import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { combineLatest, forkJoin, merge } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
// import { Article } from 'src/app/interfaces/article.interface';
// import { Category } from 'src/app/interfaces/category.interface';
// import { ArticleService } from 'src/app/services/article.apollo.service';
// import { CategoryService } from 'src/app/services/category.apollo.service';
// import { FileService } from 'src/app/services/file.parse.service';


@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {


  // categories!: Category[];
  categories$: Observable<Category[]> = this.categoryService.categories$ as Observable<Category[]>;
  articles$: Observable<Article[]> = this.articleService.articles$ as Observable<Article[]>;
  imgBuffer!: any;

  selectedFile!: File;

  fileChanged: boolean = false;
  selectedCategoryId: string = '';
  selectedCategory!: Category | undefined;
  currentArticleId: string = '';
  formMode: 'create' | 'update' = 'create'
  permalink: string = '';
  imgSrc: string = 'assets/images/placeholder-306x198.jpg';



  formStatus: string[] = ['Création d\' article', 'créer un nouvel article'];



  articleForm!: FormGroup;

  get fcontrols() {
    return this.articleForm.controls;
  }


  constructor(
    // private backService: B4aService,
    private categoryService: CategoryService,
    private articleService: ArticleService,
    // private fileService: FileService,
    private router: Router,
    private route: ActivatedRoute
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


  onTitleChange(event: any) {
    const title = event.target.value;
    this.permalink = title.toLowerCase().replace(/\s/g, '-');
    this.articleForm.patchValue({ permalink: this.permalink });

  }

  onImgFileChange(event: any) {

    this.selectedFile = event.target.files[0] as File;

    if (this.formMode === 'update') {
      const formerImgSrc = this.imgSrc;
      this.fileChanged = true;
      console.log('ne pas oublier de détruire %s du cloud !!!', formerImgSrc);
      // this.fileService.deleteImage(formerImgSrc);
    }

    // pour affichage image preview  ("readAsDataURL" method)
    const reader = new FileReader();
    reader.onload = (e) => { this.imgSrc = reader.result as string; }
    reader.readAsDataURL(this.selectedFile);   // image preview URL base64 encoded
    console.log('image sélectionnée : ', this.selectedFile);
  }

  onSubmit() {

    if (this.formMode === 'create') {
      const article: Article = { ...this.articleForm.value, createdAt: new Date() };
      console.log('article à créer : ', article);
      // this.fileService.uploadImage(this.selectedFile)
      //   .then((url: string) => {
      //     if (url !== '') {
      //       article.imgPath = url;
      //       console.log('image uploadée : ', url);
      //       this.articleService.createArticle(article);
      //       this.articleForm.reset();
      //       this.router.navigate(['..']);  // retour à la liste des articles
      //     }
      //   })
      //   .catch((error: any) => {
      //     console.error('parseFile', error);
      //   }
      //   );
    } else {   // update

      const article: Article = { ...this.articleForm.value, createdAt: new Date() };
      // if (this.fileChanged) {
      //   this.fileService.uploadImage(this.selectedFile).then((url: string) => {
      //     if (url !== '') {
      //       article.imgPath = url;
      //       console.log('image uploadée : ', url);
      //       this.articleService.updateArticle(article);
      //       this.articleForm.reset();
      //       this.router.navigate(['/articles']);
      //     }
      //   }).catch((error: any) => {
      //     console.error('parseFile', error);
      //   }
      //   );
      // } else {
      //   article.imgPath = this.imgSrc;
      //   this.articleService.updateArticle(article);
      //   this.articleForm.reset();
      //   this.router.navigate(['/articles']);
      // }


    }
  }

  initForm() {

    this.articleForm = new FormGroup({
      id: new FormControl(''),
      category: new FormControl(null, Validators.required),
      title: new FormControl('', [Validators.required, Validators.minLength(1)]),
      permalink: new FormControl(''),
      content: new FormControl('', Validators.required),
      imgPath: new FormControl('', Validators.required),
      summary: new FormControl('', [Validators.required, Validators.minLength(5)]),
      isPublished: new FormControl(false, Validators.required)

    });

  }

  setForm(article: Article) {

    this.selectedCategoryId = article.categoryArticlesId as string;
    this.imgSrc = article.imgPath;
    console.log('setForm ; image :', this.imgSrc);
    this.articleForm.get('id')?.setValue(article.id);
    // this.articleForm.get('category')?.patchValue(article.categoryId);
    this.articleForm.get('title')?.setValue(article.title);
    this.articleForm.get('permalink')?.setValue(article.permalink);
    this.articleForm.get('content')?.setValue(article.content);
    // this.articleForm.get('imgPath')?.setValue(article.imgPath);
    this.articleForm.get('summary')?.setValue(article.summary);
    this.articleForm.get('isPublished')?.setValue(article.isPublished);

    this.formStatus = ['Modification d\'un article', 'modifier cet article'];;
    this.formMode = 'update';
  }

}
