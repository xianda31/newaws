import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Article } from 'src/app/API.service';
import { PictureOp } from 'src/app/interfaces/article.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent {

  @Input() article: Article = {} as Article;
  @Input() showLess: boolean = false;
  @Input() editable: boolean = false;
  @Input() picturesInCol: boolean = false;
  @Output() pictureClick = new EventEmitter<{ id: string, op: PictureOp, co_id: string }>();
  @Output() validateDirectoryClick = new EventEmitter<{ id: string, folder: string }>();

  onPictureClick(op: PictureOp, id: string, i: number) {
    let co_id = id;
    switch (op) {
      case 'Left':
        co_id = (i === 0 ? id : this.article.pictures!.items[i - 1]!.id);
        break;
      case 'Right':
        co_id = (i === this.article.pictures!.items.length - 1 ? id : this.article.pictures!.items[i + 1]!.id);
        break;
      case 'Edit':
        co_id = id;

        break;
      default:
        break;
    }
    console.log('onPictureClick', op, id, co_id);
    this.pictureClick.emit({ op: op, id: id, co_id: co_id });
  }

  onValidateDirectoryClick(event: any) {
    let root = this.getRoot(this.article)
    let folder = this.getFolder(this.article);
    this.validateDirectoryClick.emit({ id: this.article.id, folder: root + folder });
    event.stopPropagation();
  }

  getMonth(date: Date | string): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }
  getDayOfTheMonth(date: string): number {
    let d = new Date(date);
    return d.getDate();
  }

  getFolder(article: Article): string {
    return this.editable ? (article.directory ? article.directory.replace(environment.S3articlesDirectory, '') : '') : '';
  }

  getRoot(article: Article) {
    return this.editable ? environment.S3articlesDirectory : article.directory ?? '';
  }

}
