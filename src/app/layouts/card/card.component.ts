import { Component, Input, OnInit, SecurityContext } from '@angular/core';
import { Router } from '@angular/router';
import { Article, Category } from 'src/app/API.service';
import { Storage } from 'aws-amplify/lib-esm';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() article!: Article;
  @Input() catLabel !: string;
  @Input() displaymode: 'vertical' | 'horizontal' = 'vertical';
  bannerURL !: string;

  constructor(
    // private router: Router,
  ) { }


  async ngOnInit(): Promise<void> {

    if (this.article.banner && this.article.banner !== '') {
      // this.bannerURL = 'assets/images/bcsto.jpg';

      this.bannerURL = await Storage.get('banners/' + this.article.banner, { validateObjectExistence: true });
    } else {
      this.bannerURL = 'assets/images/bcsto.jpg';
    }
  }


}
