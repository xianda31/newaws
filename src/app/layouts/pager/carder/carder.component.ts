import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren, ViewContainerRef, OnChanges, SimpleChanges } from '@angular/core';
import { Article } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';
import { AdDirective } from 'src/app/layouts/pager/plugins/ad/ad.directive';
import { AdItem } from '../plugins/ad/ad-item';
import { AdComponent } from '../plugins/ad/ad.component';
import { FlashPluginComponent } from '../plugins/flash-plugin/flash-plugin.component';
import { FlashData } from '../plugins/flash-plugin/flash-plugin.interface';
import { environment } from 'src/app/environments/environment';
import tinymce from 'tinymce';
import { SafeHtml } from '@angular/platform-browser';



@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent implements OnInit, OnChanges {

  @Input() article!: Article;
  @Input() editable: boolean = false;
  @Output() newArticleItem = new EventEmitter<Article>();
  // @ViewChild(AdDirective, { static: true }) anchor!: AdDirective;
  // viewContainerRef !: ViewContainerRef;

  @ViewChildren('bodyArea') bodyArea!: QueryList<any>;
  @ViewChildren('headArea') headArea!: QueryList<any>;

  bannerURL !: string;
  data!: FlashData;
  showLess: boolean = false;

  constructor(
    // private router: Router,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['editable']) {
      // console.log('carder  : ngOnChanges : editable=', this.editable)
      if (this.editable) {
        // this.removeEditors();
        // this.initHeadLineEditor();
        this.headArea.forEach((el) => {
          console.log('headArea : %o', el);
        });
      }
    }
  }

  // ngAfterViewInit(): void {
  //   if (this.editable) {
  //     // console.log('carder  : ngAfterViewInit : editable=', this.editable)
  //     this.initHeadLineEditor()
  //   }
  //   console.log('armement observable bodyArea.changes')
  //   this.headArea.changes.subscribe((r) => {
  //     console.log('headArea.changes : %o', r);
  //     this.removeEditors();
  //     this.initHeadLineEditor()
  //   });

  // }

  async ngOnInit(): Promise<void> {
    console.log('carder : ngOnInit : editable=', this.editable)
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

  close() {
    this.newArticleItem.emit(this.article);
    this.removeEditors();
  }

  headSave(html: SafeHtml): void {
    this.article.headline = html as string;
    // this.createForm.patchValue({ head_html: this.article0.headline });
    this.data.headline = html.toString();
    console.log('headSave %s bytes', this.data.headline.length);
  }

  initHeadLineEditor() {
    const el = document.getElementById('headArea');
    if (el === null) {
      console.log('el not found');
      return;
    }
    console.log('initHeadLineEditor : el=', el);

    tinymce.init(
      {
        target: el,
        inline: true,
        menubar: false,
        content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",

        plugins: ' code  wordcount save',
        toolbar: 'undo redo blocks | bold italic | forecolor | code | save cancel',
        save_onsavecallback: () => {
          this.headSave(tinymce.activeEditor!.getContent());
          // console.log('Saved');
        },
        toolbar_location: 'bottom',
        valid_elements: 'p[style],h*,strong,em,span[style]',
        valid_styles: {
          '*': 'font-size,font-family,color,text-decoration,text-align'
        }
      }).then((editors) => {
        console.log('initHeadLineEditor : %s editors initialised', editors.length);
        // tinymce.activeEditor!.setContent(this.article.headline);
      });
  }

  removeEditors() {
    // if (this.editorExist) {
    tinymce.remove('#headArea');
    // this.editorExist = false;
  }
}
