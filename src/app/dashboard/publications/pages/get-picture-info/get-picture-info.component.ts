import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Picture } from 'src/app/API.service';


@Component({
  selector: 'app-get-picture-info',
  templateUrl: './get-picture-info.component.html',
  styleUrls: ['./get-picture-info.component.scss']
})
export class GetPictureInfoComponent {
  @Input() picture!: Picture;
  pictureForm !: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,

  ) { }
  ngOnInit(): void {
    this.initForm(this.picture);
    // this.date = this.article.info ?? '';
    // this.withDate = this.article.info ? true : false;

  }

  initForm(picture: Picture) {
    this.pictureForm = new FormGroup({
      caption1: new FormControl(picture.caption1),
      caption2: new FormControl(picture.caption2),
      orientation: new FormControl(picture.orientation),
    });
  }
  clear_caption1() { this.pictureForm.get('caption1')!.patchValue(''); }
  clear_caption2() { this.pictureForm.get('caption2')!.patchValue(''); }
  clear_orientation() { this.pictureForm.get('orientation')!.patchValue('PORTRAIT'); }

  infoChanged() {
    this.picture.caption1 = this.pictureForm.get('caption1')!.value;
    this.picture.caption2 = this.pictureForm.get('caption2')!.value;
    this.picture.orientation = this.pictureForm.get('orientation')!.value;
    this.activeModal.close(this.picture);
  }

}
