import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { APIService, Article, CreatePictureInput, Picture } from '../API.service';
import { Menu } from '../interfaces/navigation.interface';

@Injectable({
  providedIn: 'root'
})
export class PictureService {
  private _pictures: Picture[] = [];
  pictures$: BehaviorSubject<Picture[]> = new BehaviorSubject<Picture[]>(this._pictures);


  constructor(
    private api: APIService,
  ) {

    // READ ALL IMAGES

    this.api.ListPictures().then((result) => {
      this._pictures = result.items as Picture[];
      console.log('%s pictures identifiées : ', this._pictures.length, this._pictures);
      this.pictures$.next(this._pictures);

    })
      .catch((error) => { console.log('init pictures failed !!', error) });

  }

  // C(R)UD IMAGES

  createPicture(picture: Picture | CreatePictureInput) {

    console.log('createPicture : ', picture);

    this.api.CreatePicture(picture).then((result) => {
      const picture = result as Picture;
      this._pictures.push(picture);
      this.pictures$.next(this._pictures);
    })
      .catch((error) => { console.log('Error creating picture: ', error); });
  }

  sgetPicture(id: string): Picture {
    return this._pictures.find((picture) => picture.id === id)!;
  }



  updatePicture(picture: Picture) {
    const { createdAt, updatedAt, __typename, ...pictureInput } = picture;
    this.api.UpdatePicture(pictureInput).then((result) => {
      this._pictures = this._pictures.map((item) => item.id === picture.id ? picture : item);
      this.pictures$.next(this._pictures);
    })
      .catch((error) => { console.log('Error updating picture: ', error); });

  }


  deletePicture(picture: Picture) {
    this.api.DeletePicture({ id: picture.id }).then((result) => {
      this._pictures = this._pictures.filter((item) => item.id !== picture.id);
      this.pictures$.next(this._pictures);
    })
      .catch((error) => {
        console.log('Error deleting picture: ', error);
      });
  }


  // utilities

  //   async articlesByPictureId(pictureId: string): Promise<Article[]> {
  //     let result = await this.api.ArticlesByPictureId(pictureId);
  //     // console.log('articlesByPictureId : ', result);
  //     return result.items as Article[];
  //   }

  //   sgetPictureByLabel(label: string): Picture {
  //     let picture = this._pictures.find((picture) => picture.label === label);
  //     if (!picture) { console.log('picture %s not found ... has been replaced by 404', label) }
  //     return picture ? picture : this._pictures.find((picture) => picture.label === '404')!;
  //   }
  //   sgetPictureByPath(path: string): Picture | undefined {
  //     let picture = this._pictures.find((picture) => picture.path === path);
  //     if (!picture) { console.log('picture %s not found ... has been replaced by 404', path) }
  //     return picture;
  //   }

}


