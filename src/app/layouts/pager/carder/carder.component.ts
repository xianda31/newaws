import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';
import { FlashData } from '../plugins/flash-plugin/flash-plugin.interface';
import { environment } from 'src/app/environments/environment';



@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent implements OnInit {

  @Input() article!: Article;
  @Input() showLess: boolean = false;
  @Input() editable: boolean = false;
  @Input() viewMode: 'textual' | 'diapo' = 'textual';
  // @Output() newArticleItem = new EventEmitter<Article>();
  // @ViewChild(AdDirective, { static: true }) anchor!: AdDirective;
  // viewContainerRef !: ViewContainerRef;

  @ViewChildren('bodyArea') bodyArea!: QueryList<any>;
  @ViewChildren('headArea') headArea!: QueryList<any>;

  bannerURL !: string;
  data!: FlashData;


  async ngOnInit(): Promise<void> {
    this.prepView(this.article);
  }


  prepView(article: Article): void {
    let flashData: FlashData = {
      title: article.title,
      image: "",
      headline: article.headline,
      body: article.body ?? ' ', //this.getHTMLcontent$('articles/' + article.body),
      date: article.info ? new Date(article.info) : null,
      index: article.id
    };
    const images = article.pictures?.items;
    if (images && images.length > 0) {
      const image = images[0];
      const key = 'images/' + image!.id;
      Storage.get(key, { level: 'public' })
        .then((result) => {
          flashData.image = result as string;
          this.data = { ...flashData };
        })
        .catch((err) => {
          console.log('triggerView : error : %o', err);
        });
    } else {
      this.data = { ...flashData };
    }
  }

  buildURL(key: string): string {
    const BucketName = environment.BucketName;
    const Region = environment.Region;
    const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;
    return uri;
  }


  getMonth(date: Date): string {
    return date.toLocaleString('fr-FR', { month: 'short' });
  }

}
