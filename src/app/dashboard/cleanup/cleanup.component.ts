import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, from, map, of, take } from 'rxjs';
import { Picture } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { PageService } from 'src/app/aws.services/page.aws.service';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { PictureOrientationTypeEnum } from 'src/app/interfaces/picture.interface';
import { FileService } from 'src/app/tools/service/file.service';

@Component({
  selector: 'app-cleanup',
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.scss']
})
export class CleanupComponent implements OnInit {

  pictures: Picture[] = [];
  uries = new Map<string, Promise<string>>();
  orphanExists: boolean = false;

  constructor(
    private pageService: PageService,
    private articleService: ArticleService,
    private fileService: FileService,
    private pictureService: PictureService,
  ) { }

  ngOnInit(): void {

    this.pictureService.pictures$.subscribe((pictures) => {
      this.pictures = pictures;
      this.pictures.forEach(async (picture) => {
        // recuperation d'une url pour chaque image
        this.uries.set(picture.filename, this.fileService.getFileURL(picture.filename));
        // verification si l'image est orpheline ie sans article père
        if (this.isOrphan(picture)) {
          this.orphanExists = true;
        }
        // verfication du champ format
        if (!picture.orientation) {
          let Orientation = 'PORTRAIT' as PictureOrientationTypeEnum;
          if (Orientation) {
            picture.orientation = Orientation;
            this.pictureService.updatePicture(picture);
          }
        }
      });
    }


    );
  }

  isOrphan(picture: Picture): boolean {
    return this.articleService.getArticleById(picture.articleId) === undefined;
  }

  deleteOrphanPictures() {
    this.pictures.forEach((picture) => {
      if (this.isOrphan(picture)) {
        this.pictureService.deletePicture(picture);
      }
    });
  }

  geturi(name: string): Promise<string> {
    return this.uries.get(name) ?? Promise.resolve('');
  }



}
