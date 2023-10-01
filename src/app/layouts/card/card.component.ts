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
  @Input() catLabel !: string;    // non renseigné au niveau Article quand query Category 
  @Input() displaymode: 'vertical' | 'horizontal' = 'vertical';
  signedURL !: string;

  constructor(
    // private router: Router,
  ) { }


  async ngOnInit(): Promise<void> {

    if (this.article.banner && this.article.banner !== '') {
      this.signedURL = await Storage.get(this.article.banner, { validateObjectExistence: true });
    } else {
      this.signedURL = 'assets/images/bcsto.jpg';
    }

  }


}
