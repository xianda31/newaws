import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { Picture } from 'src/app/API.service';
import { PictureService } from 'src/app/aws.services/picture.aws.service';
import { FileService } from 'src/app/tools/service/file.service';
import { ToastService } from 'src/app/tools/service/toast.service';

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  pictureForm!: FormGroup;
  pictures$: Observable<Picture[]> = this.pictureService.pictures$;
  pictureByRootMenu: { [key: string]: number } = {};
  createMode: boolean = true;
  selectedPicture!: Picture;
  picture_file!: File;
  imgBuffer: any;
  picture_urlChanged: boolean = false;
  picture_size: string = '';


  constructor(
    private pictureService: PictureService,
    private fileService: FileService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.pictures$.subscribe((pictures) => {
      console.log('%s picture chargées', pictures.length);
    });



    this.pictureForm = new FormGroup({
      title: new FormControl('', Validators.required),
      filename: new FormControl({ value: '', disabled: true }),
      caption: new FormControl('', Validators.required),
      path: new FormControl('', Validators.required),
    });

  }

  get filename() { return this.pictureForm.get('filename')! as FormControl; }
  get path() { return this.pictureForm.get('path')! as FormControl; }

  async selectPicture(picture: Picture) {
    this.pictureForm.patchValue(picture);
    this.createMode = false;
    this.selectedPicture = picture;
    this.imgBuffer = await this.fileService.getFileURL(this.fullPath(picture.path, picture.filename));
    this.calcSize(this.imgBuffer);
    // console.log('imgBuffer', this.imgBuffer);

  }

  fullPath(path: string, fname: string) {
    return 'pictures/' + path + '/' + fname;
  }
  // CR(U)D CATEGORIES


  createPicture() {
    console.log('createPicture');
    if (this.pictureForm.invalid) {
      this.pictureForm.markAllAsTouched();
      return;
    }
    console.log('attempt to upload picture file %o', this.picture_file)
    const url = this.fullPath(this.path.value, this.filename.value);

    this.fileService.uploadFile(url, this.picture_file)
      .then((result) => {
        console.log('uploadFile', result);
        // this.url.patchValue(url);
        this.pictureService.createPicture(this.pictureForm.getRawValue());
        this.pictureForm.reset();
        this.resetImgBuffer();
      })
      .catch((error) => { console.log('Error creating picture: ', error); });

  }

  updatePicture() {
    if (this.pictureForm.invalid) {
      this.pictureForm.markAllAsTouched();
      return;
    }
    let newPicture = { ...this.pictureForm.getRawValue() };
    newPicture.id = this.selectedPicture.id;
    this.pictureService.updatePicture(newPicture);
    this.pictureForm.reset();
    this.resetImgBuffer();
    this.createMode = true;
  }


  async deletePicture(picture: Picture) {

    const item = { ...picture }
    this.fileService.deleteFile(this.fullPath(item.path, item.filename))
    this.pictureService.deletePicture(item);
    this.pictureForm.reset();
    this.resetImgBuffer();
    this.createMode = true;

  }

  cancel() {
    this.pictureForm.reset();
    this.resetImgBuffer();
    this.createMode = true;
  }


  // ************ gestion picture ******************

  resetImgBuffer() {
    this.imgBuffer = null;
    this.picture_size = '';
  }

  filePreview(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (!file) { return };

    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgBuffer = reader.result;

      // compute image size & store it in picture_size
      this.calcSize(this.imgBuffer);

      this.picture_file = file;
      this.pictureForm.get('filename')!.patchValue(this.picture_file.name);
      this.picture_urlChanged = true;
    }
  }

  calcSize(url: string) {

    // compute image size & store it in picture_size

    const img = new Image();
    img.src = url;
    img.onload = () => {
      // console.log("img wxh : ", img.width, img.height);
      this.picture_size = img.width + 'x' + img.height;
    }
  }

}



