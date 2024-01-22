import { Component, OnInit } from '@angular/core';
import { Form, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, map, of, take, tap } from 'rxjs';
import { Article, Picture } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { FileService } from 'src/app/tools/service/file.service';
import { PictureOrientationTypeEnum, orientationIcons } from 'src/app/interfaces/picture.interface';



@Component({
  selector: 'app-cleanup',
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.scss']
})
export class CleanupComponent implements OnInit {
  options = orientationIcons;
  pictures$: Observable<Picture[]> = this.pictureService.pictures$.pipe(
    map((pictures) => pictures.sort((a, b) => (a.articleId < b.articleId ? -1 : 1))));
  articles$: Observable<Article[]> = this.articleService.articles$.pipe(
    map((articles) => articles.filter((article) => article.layout === 'Pictural'))
  )
  uries = new Map<string, Promise<string>>();
  pictureForm !: FormGroup;
  selectedPicture!: Picture;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private fileService: FileService,
    private pictureService: PictureService,
  ) { }

  ngOnInit(): void {

    this.pictures$.subscribe((pictures) => {
      // this.pictures = pictures;
      pictures.forEach(async (picture) => {
        // recuperation d'une url pour chaque image
        this.uries.set(picture.filename, this.fileService.getFileURL(picture.filename));
      });
    });

    this.articles$.subscribe((articles) => {
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
  }

  getIcon(key: string): string {
    return this.options[key as PictureOrientationTypeEnum];
  }

  checkArticle(articleId: string): string | null {
    let article = this.articleService.getArticleById(articleId);
    return article ? article.title : null;
  }

  updatePicture() {
    this.pictureService.updatePicture(this.pictureForm.value as Picture);
  }


  geturi(name: string): Promise<string> {
    return this.uries.get(name) ?? Promise.resolve('');
  }

  selectPicture(picture: Picture) {
    this.selectedPicture = picture;
    this.pictureForm.patchValue(picture);
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
}
