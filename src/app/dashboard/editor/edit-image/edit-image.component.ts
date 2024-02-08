import { Component, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/API.service';
import { FileService } from 'src/app/shared/service/file.service';
import { GetPictureInfoComponent } from '../../../shared/modals/get-picture-info/get-picture-info.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PictureService } from 'src/app/aws.services/picture.aws.service';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrl: './edit-image.component.scss'
})
export class EditImageComponent implements OnInit {

  @Input() picture: Picture = {} as Picture;
  signedUrl: string = '../../../../assets/images/no_image.jpg';
  orientation: string = 'img-fit-paysage';
  alt: string = 'alt'

  constructor(
    private fileService: FileService,
    private modalService: NgbModal,
    private pictureService: PictureService,



  ) { }


  ngOnInit() {

    this.fileService.getFileURL(this.picture.filename)
      .then((result) => this.signedUrl = result)
      .catch((err) => console.log('fichier image non trouvé ...', err));

    this.orientation = this.picture.orientation === 'ITALIAN' ? 'img-fit-portrait' : 'img-fit-paysage';
    this.alt = this.getFilename(this.picture.filename);
  }

  getFilename(path: string): string {
    const keys = path.split('/');
    return keys[keys.length - 1];
  }

  onClick(): void {
    const modalRef = this.modalService.open(GetPictureInfoComponent, { centered: true });
    modalRef.componentInstance.picture = (this.picture as Picture);
    modalRef.result.then((picture) => {
      // console.log('result', picture);
      this.pictureService.updatePicture(picture);
      this.orientation = this.picture.orientation === 'ITALIAN' ? 'img-fit-portrait' : 'img-fit-paysage';

    }).catch((error) => {
      console.log('error', error);
    });
  }
}


