import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Layout, LayoutIcons } from 'src/app/interfaces/article.interface';

@Component({
  selector: 'app-get-article-name',
  templateUrl: './get-article-name.component.html',
  styleUrl: './get-article-name.component.scss'
})
export class GetArticleNameComponent {
  layout: Layout = 'Textual';

  constructor(
    public activeModal: NgbActiveModal,

  ) { }

  onSubmit() {
    // console.log('GetDirectoryComponent : directoryChanged', this.directory);

    this.activeModal.close(this.layout);
  }


  getOrientationIcons(): any {
    return LayoutIcons;
  }
}
