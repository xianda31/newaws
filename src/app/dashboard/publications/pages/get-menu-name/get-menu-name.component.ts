import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-get-menu-name',
  templateUrl: './get-menu-name.component.html',
  styleUrl: './get-menu-name.component.scss'
})
export class GetMenuNameComponent {
  @Input() text: string = '';
  label: string = '';

  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  onSubmit() {
    // console.log('GetDirectoryComponent : directoryChanged', this.directory);

    this.activeModal.close(this.label);
  }
}
