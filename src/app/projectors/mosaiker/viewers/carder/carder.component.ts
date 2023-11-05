import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Article } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';
import { AdDirective } from 'src/app/projectors/slider/ad.directive';
import { AdItem } from 'src/app/projectors/slider/ad-item';
import { AdComponent } from 'src/app/projectors/slider/ad.component';
import { FlashPluginComponent } from '../../../slider/plugins/flash-plugin/flash-plugin.component';



@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent implements OnInit {

  @Input() article!: Article;
  @ViewChild(AdDirective, { static: true }) anchor!: AdDirective;
  viewContainerRef !: ViewContainerRef;

  bannerURL !: string;

  constructor(
    // private router: Router,
  ) { }


  async ngOnInit(): Promise<void> {

    this.viewContainerRef = this.anchor.viewContainerRef;

    await this.loadComponent(this.article);

  }

  async loadComponent(article: Article) {
    const bannerURL = await Storage.get('banners/' + article.banner, { validateObjectExistence: true });
    const HTMLstring = await this.loadHTML(article);
    const adItem = new AdItem(FlashPluginComponent, { title: article.title, summary: article.summary, bannerURL: bannerURL, HTMLstring: HTMLstring, day: 24, month: 'Dec' });
    const componentRef = this.viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  loadHTML(article: Article): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const blob = await Storage.get('articles/' + article.permalink, { download: true });
      if (blob.Body === undefined) { reject(); }
      else { blob.Body.text().then((text) => { resolve(text); }); }
    });
  }
}
