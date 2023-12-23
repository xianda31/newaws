import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { Article, Picture } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';
import { FlashData } from '../plugins/flash-plugin/flash-plugin.interface';
import { environment } from 'src/app/environments/environment';
import { CardType, PictureOp } from 'src/app/interfaces/page.interface';
import { FileService } from '../../../tools/service/file.service';



@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent implements OnInit {

  @Input() article!: Article;
  @Input() showLess: boolean = false;
  @Input() editable: boolean = false;
  @Output() pictureClick = new EventEmitter<{ id: string, op: PictureOp, co_id: string }>();

  // @ViewChildren('bodyArea') bodyArea!: QueryList<any>;
  // @ViewChildren('headArea') headArea!: QueryList<any>;

  // bannerURL !: string;
  data!: FlashData;


  constructor(
    private fileService: FileService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.prepView(this.article);
  }


  async prepView(article: Article): Promise<void> {
    let flashData: FlashData = {
      title: article.title,
      // image: "",
      headline: article.headline,
      layout: article.layout as CardType,
      body: article.body ?? ' ', //this.getHTMLcontent$('articles/' + article.body),
      date: article.info ? new Date(article.info) : null,
      id: article.id
    };
    // const images = article.pictures?.items;
    if (article.pictures?.items && article.pictures?.items.length > 0) {
      // console.log('...retrieving image from S3 for article', article);
      let getFn = (path: string) => { const keys = path.split('/'); return keys[keys.length - 1]; };
      flashData.pictures = article.pictures?.items
        .map((item) => {
          return {
            id: item!.id,
            uri: this.fileService.getFileURL(item!.filename),
            alt: getFn(item!.filename),
            caption1: item?.caption1 ?? '',
            caption2: item?.caption2 ?? '',
            rank: item?.rank ?? 0,
          }
        })
        .sort((a, b) => (a.rank < b.rank ? 1 : -1));
      // flashData.pictures = pictures;
    }
    // console.log('flashData', flashData);
    this.data = { ...flashData };

  }

  onPictureClick(op: PictureOp, id: string, i: number) {
    let co_id = id;
    switch (op) {
      case 'Left':
        co_id = (i === 0 ? id : this.data.pictures![i - 1].id);
        break;
      case 'Right':
        co_id = (i === this.data.pictures!.length - 1 ? id : this.data.pictures![i + 1].id);
        break;
      default:
        break;
    }
    this.pictureClick.emit({ op: op, id: id, co_id: co_id });
  }

  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }

}
