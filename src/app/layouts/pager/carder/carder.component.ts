import { Component, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Article } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';
import { AdDirective } from 'src/app/layouts/pager/plugins/ad/ad.directive';
import { AdItem } from '../plugins/ad/ad-item';
import { AdComponent } from '../plugins/ad/ad.component';
import { FlashPluginComponent } from '../plugins/flash-plugin/flash-plugin.component';



@Component({
  selector: 'app-carder',
  templateUrl: './carder.component.html',
  styleUrls: ['./carder.component.scss']
})
export class CarderComponent implements OnInit {

  @Input() article!: Article;
  @Input() solo: boolean = false;
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
    const bannerURL = await Storage.get('banners/' + article.image_url, { validateObjectExistence: true });
    const HTMLstring = await this.loadHTML(article);
    const adItem = new AdItem(FlashPluginComponent, { solo: this.solo, title: article.title, summary: article.headline, bannerURL: bannerURL, HTMLstring: HTMLstring, day: 24, month: 'Dec' });
    const componentRef = this.viewContainerRef.createComponent<AdComponent>(adItem.component);
    componentRef.instance.data = adItem.data;
  }

  loadHTML(article: Article): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const blob = await Storage.get('articles/' + article.body, { download: true });
      if (blob.Body === undefined) { reject(); }
      else { blob.Body.text().then((text) => { resolve(text); }); }
    });
  }
}
