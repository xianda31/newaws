import { Component, Input, OnInit } from '@angular/core';
import { Picture } from 'src/app/API.service';
import { FileService } from '../../shared/service/file.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {

  @Input() picture: Picture = {} as Picture;
  signedUrl: string = '../../../../assets/images/no_image.jpg';
  orientation: string = 'ITALIAN';
  alt: string = 'alt'

  constructor(
    private fileService: FileService,

  ) { }


  ngOnInit() {

    this.fileService.getFileURL(this.picture.filename)
      .then((result) => this.signedUrl = result)
      .catch((err) => console.log('fichier image non trouvé ...', err));

    this.orientation = this.picture.orientation === 'ITALIAN' ? 'card-img img-fit-portrait' : 'card-img img-fit-paysage';
    this.alt = this.getFilename(this.picture.filename);
  }

  getFilename(path: string): string {
    const keys = path.split('/');
    return keys[keys.length - 1];
  }
}

