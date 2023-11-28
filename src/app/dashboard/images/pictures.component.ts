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
  // pictureByRootMenu: { [key: string]: number } = {};
  createMode: boolean = true;
  selectedPicture!: Picture;
  imgBuffer: any;

  image_changed: boolean = false;
  image_size: string = '';
  image_file!: File;

  root_folder: string = 'pictures/';
  sub_folder: string = '';

  constructor(
    private pictureService: PictureService,
    private fileService: FileService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.pictures$.subscribe((pictures) => {
      // console.log('%s picture chargées', pictures.length);
    });


    this.pictureForm = new FormGroup({
      title: new FormControl('', Validators.required),
      filename: new FormControl('', Validators.required),
      caption: new FormControl('', Validators.required),
      path: new FormControl('', Validators.pattern('^$|\/$')),
    });

    this.path.valueChanges.subscribe((newPath) => {
      // console.log('path changed', newPath);
      this.image_changed = true;
    });

  }

  get filename() { return this.pictureForm.get('filename')! as FormControl; }
  get path() { return this.pictureForm.get('path')! as FormControl; }

  async selectPicture(picture: Picture) {
    this.pictureForm.patchValue(picture);
    this.createMode = false;
    this.image_changed = false;
    this.sub_folder = picture.path;
    this.selectedPicture = picture;
    try {
      this.imgBuffer = await this.fileService.getFileURL(this.fullUrl(picture.path, picture.filename));
      this.calcSize(this.imgBuffer);
    } catch (error) {
      console.log('l\'image %s n\'a pas été trouvée :o( ', this.fullUrl(picture.path, picture.filename));
    }
    // console.log('imgBuffer', this.imgBuffer);

  }

  fullUrl(path: string, fname: string) {
    return 'pictures/' + path + fname;
  }
  reducePath(fullPath: string): string {
    return fullPath.replace('pictures/', '');

  }

  // CR(U)D CATEGORIES


  createPicture() {
    // console.log('createPicture');
    if (this.pictureForm.invalid) {
      this.pictureForm.markAllAsTouched();
      return;
    }
    // console.log('attempt to upload picture file %o', this.image_file)
    const url = this.fullUrl(this.path.value, this.filename.value);

    this.fileService.uploadFile(url, this.image_file)
      .then((result) => {
        // console.log('uploadFile', result);
        // this.url.patchValue(url);
        this.pictureService.createPicture(this.pictureForm.getRawValue());
        this.pictureForm.reset();
        this.resetImgBuffer();
        this.image_changed = false;
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
    if (this.image_changed) {
      // console.log('image change from %s to %s', this.selectedPicture.path, this.path.value);
      try {

        this.fileService.deleteFile(this.fullUrl(this.selectedPicture.path, this.selectedPicture.filename));
        // console.log('image %s supprimée', this.fullUrl(this.selectedPicture.path, this.selectedPicture.filename));
        this.fileService.uploadFile(this.fullUrl(this.path.value, this.filename.value), this.image_file);
        // console.log('image %s uploadée', this.fullUrl(this.path.value, this.filename.value));
      } catch (error) {
        console.log('l\'image %s n\'a pas été renommée :o( ', this.fullUrl(this.selectedPicture.path, this.selectedPicture.filename));
      }
    }
    this.pictureService.updatePicture(newPicture);
    this.pictureForm.reset();
    this.resetImgBuffer();
    this.createMode = true;
  }


  async deletePicture(picture: Picture) {

    const item = { ...picture }
    this.fileService.deleteFile(this.fullUrl(item.path, item.filename))
    this.pictureService.deletePicture(item);
    this.pictureForm.reset();
    this.resetImgBuffer();
    this.createMode = true;

  }

  cancel() {
    this.pictureForm.reset();
    this.resetImgBuffer();
    this.sub_folder = '';
    this.createMode = true;
  }

  pathChange(newPath: string) {
    this.path.patchValue(this.reducePath(newPath));
  }


  // ************ gestion picture ******************

  resetImgBuffer() {
    this.imgBuffer = null;
    this.image_size = '';
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

      this.image_file = file;
      this.pictureForm.get('filename')!.patchValue(this.image_file.name);
      this.image_changed = true;
    }
  }

  calcSize(url: string) {

    // compute image size & store it in picture_size

    const img = new Image();
    img.src = url;
    img.onload = () => {
      this.image_size = img.width + 'x' + img.height;
    }
  }

}



