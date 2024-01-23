import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, max } from 'rxjs';
import { Article, Page, Picture } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { FileService } from 'src/app/tools/service/file.service';
import { PictureOrientationTypeEnum, orientationIcons } from 'src/app/interfaces/picture.interface';
import { Layout, LayoutIcons } from 'src/app/interfaces/article.interface';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cleanup',
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.scss']
})
export class CleanupComponent implements OnInit {
  pictures$: Observable<Picture[]> = this.pictureService.pictures$.pipe(
    map((pictures) => pictures.sort((a, b) => (a.articleId < b.articleId ? -1 : 1))));
  picturalArticles$: Observable<Article[]> = this.articleService.articles$.pipe(
    map((articles) => articles.filter((article) => article.layout === 'Pictural'))
  )
  articles$: Observable<Article[]> = this.articleService.articles$.pipe(
    map((articles) => articles.sort((a, b) => (a.pageId < b.pageId ? -1 : 1))));
  pages$: Observable<Page[]> = this.pageService.pages$;
  uries = new Map<string, Promise<string>>();
  pictureForm !: FormGroup;
  articleForm!: FormGroup;
  selectedPicture!: Picture;
  selectedArticle!: Article;
  pictureSelected: boolean = false;
  articleSelected: boolean = false;
  nbrOfPictures = 0;
  nbrOfArticles = 0;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private fileService: FileService,
    private pictureService: PictureService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.pictures$.subscribe((pictures) => {
      this.nbrOfPictures = pictures.length;
      pictures.forEach(async (picture) => {
        // recuperation d'une url pour chaque image
        this.uries.set(picture.filename, this.fileService.getFileURL(picture.filename));
      });
    });

    this.articles$.subscribe((articles) => {
      this.nbrOfArticles = articles.length;
    });
    this.pages$.subscribe((pages) => {
    });

    this.pictureForm = new FormGroup({
      id: new FormControl(''),
      filename: new FormControl(''),
      orientation: new FormControl(''),
      rank: new FormControl(''),
      articleId: new FormControl(''),
      caption1: new FormControl(''),
      caption2: new FormControl(''),
    });



    this.articleForm = new FormGroup({
      id: new FormControl(''),
      title: new FormControl({ value: '', disabled: true }),
      headline: new FormControl({ value: '', disabled: true }),
      layout: new FormControl({ value: '', disabled: true }),
      body: new FormControl(''),
      pageId: new FormControl({ value: '', disabled: false }),
      date: new FormControl({ value: '', disabled: true }),
      rank: new FormControl({ value: '', disabled: true }),
      directory: new FormControl(''),
      expiry_date: new FormControl(''),
    });
  }

  getOrientationIcons(): any {
    return orientationIcons;
  }

  getOrientationIcon(key: string): string {
    return orientationIcons[key as PictureOrientationTypeEnum];
  }
  getLayoutIcon(layout: Layout | string): string {
    return LayoutIcons[layout as Layout];
  }

  checkArticle(articleId: string): string | null {
    let article = this.articleService.getArticleById(articleId);
    return article ? article.title : null;
  }
  getArticleHeadline(articleId: string): string {
    let article = this.articleService.getArticleById(articleId);
    if (!article) { return '<p>article non trouvé</p>'; }
    else { return article.headline; }
  }

  updatePicture() {
    this.pictureService.updatePicture(this.pictureForm.value as Picture);
    this.pictureSelected = false;
    this.pictureForm.reset();
  }


  geturi(name: string): Promise<string> {
    return this.uries.get(name) ?? Promise.resolve('');
  }

  selectPicture(picture: Picture) {
    this.selectedPicture = picture;
    this.pictureForm.patchValue(picture);
    this.pictureSelected = true;
  }

  deletePicture(picture: Picture) {
    this.pictureService.deletePicture(picture);
  }


  onArticleChange() {
    let articleId = this.pictureForm.value.articleId;
    let article = this.articleService.getArticleById(articleId);
    let max = 0;
    if (article!.pictures) {
      max = article!.pictures.items.reduce(
        (max, item) => (item!.rank > max) ? item!.rank : max,
        0,
      );
    }
    this.pictureForm.patchValue({ rank: max + 1 });
  }

  selectArticle(article: Article) {
    this.selectedArticle = article;
    this.articleForm.patchValue(article);
    this.articleSelected = true;
  }

  updateArticle() {
    // this.articleService.updateArticle(this.articleForm.value as Article);
    this.articleSelected = false;
  }
  viewArticle(article: Article) {
    this.router.navigate(['back/publisher/pages', article.pageId]);
  }

  onPageChange() {
    // move article to new page
    let articleId = this.articleForm.value.id;
    let article = this.articleService.getArticleById(articleId);
    if (!article) { return; }
    let page = this.pageService.sgetPage(this.articleForm.value.pageId);
    let max = 0;
    if (page!.articles) {
      max = page!.articles.items.reduce(
        (max, item) => (item!.rank > max) ? item!.rank : max,
        0,
      );
    }
    article.rank = max + 1;
    article.pageId = this.articleForm.value.pageId;
    this.articleService.updateArticle(article);

    this.articleSelected = false;
    this.articleForm.reset();
  }

  checkPage(pageId: string): string | null {
    let page = this.pageService.sgetPage(pageId);
    return page ? page.label : null;
  }

  stripHtmlTags(text: string): string {
    return text.replace(/<[^>]*>/g, '');
  }
}
