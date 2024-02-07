import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Article, CreatePictureInput, Picture } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { PictureOrientationTypeEnum } from 'src/app/interfaces/picture.interface';
import { ToastService } from 'src/app/toaster/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrl: './list-images.component.scss'
})
export class ListImagesComponent implements OnInit {
  @Input() article!: Article;
  @Input() picturesInCol: boolean = true;
  pictures: Picture[] = [];
  deleted_pictures: Picture[] = [];

  constructor(
    private pictureService: PictureService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.pictures = this.article.pictures?.items as Picture[];
    this.pictures = this.pictures.sort((a, b) => (a.rank > b.rank ? -1 : 1));

  }

  dropped(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.pictures, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.pictures.forEach((picture, index) => {
      picture.rank = index;
    });
    // console.log('pictures', this.pictures);
  }


  // C(R)UD PICTURES

  createPicture(filename: string, article: Article, rankOffset: number) {
    let max = 0;
    if (article.pictures) {
      // console.log('createPicture : article.pictures = %o', article.pictures)
      max = article.pictures.items.reduce(
        (max, item) => (item!.rank > max) ? item!.rank : max,
        0,
      );
    }
    const picture: CreatePictureInput = {
      filename: filename,
      caption1: '',
      caption2: '',
      orientation: PictureOrientationTypeEnum.Italian,
      rank: max + 1 + rankOffset,
      articleId: article.id,
    };
    this.pictureService.createPicture(picture);
    this.pictures.push(picture as Picture);

  }

  // updatePicture() {
  // }

  deletePicture(picture: Picture) {
    this.pictureService.deletePicture(picture);
  }


  addPicture() {
    // this.pictures.push(picture);
  }
  savePictures() {
    // this.article.pictures = { items: this.pictures };
  }

  emptyTrash() {
    this.deleted_pictures.forEach((picture) => this.deletePicture(picture));
    this.deleted_pictures = [];
  }

  // picture files upload
  pictureUpload(event: any) {
    function uploadPromise(key: string, file: File): Promise<any> { { return Storage.put(key, file, { level: 'public' }) } };
    const files = Array.from(event.target.files) as File[];

    if (files === undefined) { return; }

    // S3 files uploading
    let uploadPromises: Promise<any>[] = [];
    files.forEach((file: any) => {
      const key = environment.S3filesDirectory + this.article.title + '/' + file.name;
      uploadPromises.push(uploadPromise(key, file))
    });
    Promise.all(uploadPromises)
      .then(() => {
        // create associated pictures within dynamodb
        files.forEach((file: any, index: number) => {
          const key = environment.S3filesDirectory + this.article.title + '/' + file.name;
          this.createPicture(key, this.article, index);
        });
      })
      .catch((err) => {
        console.log('setPictures : S3 error:%o ', err);
        this.toastService.showErrorToast('Error uploading pictures', err);
      });
  }
}
