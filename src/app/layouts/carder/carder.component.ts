import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { Article, Picture } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';
import { ArticleData } from '../../interfaces/article.interface';
import { environment } from 'src/environments/environment';
import { CardType, PictureOp } from 'src/app/interfaces/page.interface';
import { FileService } from '../../tools/service/file.service';
import { PictureOrientationTypeEnum } from 'src/app/interfaces/picture.interface';



@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent implements OnChanges {

  @Input() article!: Article;
  @Input() showLess: boolean = false;
  @Input() editable: boolean = false;
  @Input() picturesInCol: boolean = false;
  @Output() pictureClick = new EventEmitter<{ id: string, op: PictureOp, co_id: string }>();
  // @Output() directoryClick = new EventEmitter<{ id: string, folder: string }>();
  @Output() validateDirectoryClick = new EventEmitter<{ id: string, folder: string }>();
  data!: ArticleData;


  constructor(
    private fileService: FileService,
    // private http: HttpClient,
  ) { }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    if (changes['editable'] && changes['editable'].currentValue) {
      console.log(' ngOnChanges ...  editable changed : %o', changes['editable'].currentValue);
    } else {
    }

    this.prepView(this.article);
  }


  async prepView(article: Article): Promise<void> {
    let flashData: ArticleData = {
      title: article.title,
      // image: "",
      headline: article.headline,
      layout: article.layout as CardType,
      body: article.body ?? ' ', //this.getHTMLcontent$('articles/' + article.body),
      date: article.date ? new Date(article.date) : null,
      root: this.editable ? environment.S3articlesDirectory : article.directory ?? '',
      sub_folder: this.editable ? (article.directory ? article.directory.replace(environment.S3articlesDirectory, '') : '') : '',
      id: article.id
    };

    // console.log('prepView : root ->sub_folder = %s%s', flashData.root, flashData.sub_folder);

    if (article.pictures?.items && article.pictures?.items.length > 0) {
      let getFn = (path: string) => { const keys = path.split('/'); return keys[keys.length - 1]; };
      flashData.pictures = article.pictures?.items
        .map((item) => {
          return {
            id: item!.id,
            uri: this.fileService.getFileURL(item!.filename),
            alt: getFn(item!.filename),
            caption1: item?.caption1 ?? '',
            caption2: item?.caption2 ?? '',
            orientation: item?.orientation as PictureOrientationTypeEnum ?? 'PORTRAIT',
            rank: item?.rank ?? 0,
          }
        })
        .sort((a, b) => (a.rank < b.rank ? 1 : -1));
    } else {
      const default_image = {
        id: 'default_image',
        uri: new Promise<string>((resolve, reject) => {
          resolve('../../../../assets/images/no_image.jpg');
        }),
        alt: 'no_image',
        caption1: '',
        caption2: '',
        orientation: 'PORTRAIT' as PictureOrientationTypeEnum,
        rank: 0,
      }
      // console.log('...', default_image);
      flashData.pictures = [];
      flashData.pictures.push(default_image);
    }

    // console.log('flashData', flashData);
    this.data = { ...flashData };
  }

  // onFolderClick(folder: string) {
  //   // console.log('onFolderClick', folder)
  //   this.data.sub_folder = folder.replace(environment.S3articlesDirectory, '');
  //   this.directoryClick.emit({ id: this.data.id, folder: folder });
  // }

  onPictureClick(op: PictureOp, id: string, i: number) {
    let co_id = id;
    switch (op) {
      case 'Left':
        co_id = (i === 0 ? id : this.data.pictures![i - 1].id);
        break;
      case 'Right':
        co_id = (i === this.data.pictures!.length - 1 ? id : this.data.pictures![i + 1].id);
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
    this.validateDirectoryClick.emit({ id: this.data.id, folder: this.data.root + this.data.sub_folder });
    event.stopPropagation();
  }

  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }

}
