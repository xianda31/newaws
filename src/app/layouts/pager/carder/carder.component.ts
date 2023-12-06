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
  @Input() viewMode: CardType = 'Textual';
  @Output() pictureId = new EventEmitter<{ id: string, op: PictureOp }>();
  // @ViewChild(AdDirective, { static: true }) anchor!: AdDirective;
  // viewContainerRef !: ViewContainerRef;

  @ViewChildren('bodyArea') bodyArea!: QueryList<any>;
  @ViewChildren('headArea') headArea!: QueryList<any>;

  bannerURL !: string;
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
      body: article.body ?? ' ', //this.getHTMLcontent$('articles/' + article.body),
      date: article.info ? new Date(article.info) : null,
      id: article.id
    };
    // const images = article.pictures?.items;
    if (article.pictures?.items) {
      console.log('...retrieving image from S3');

      flashData.pictures = article.pictures?.items.map((item) => {
        return {
          id: item!.id,
          uri: this.fileService.getFileURL(item!.filename),
          caption: item?.caption?.toString() ?? ''
        }
      });
      // flashData.pictures = pictures;
      this.data = { ...flashData };
    }

  }

  onPictureClick(op: PictureOp, id: string) {
    this.pictureId.emit({ id: id, op: op });
  }

  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }

}
