import { Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Article, Category } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { Storage } from 'aws-amplify/lib-esm';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})

export class PageComponent implements OnInit {

  @Input() article!: Article;
  @Input() HTMLstring!: string;
  bannerURL!: string;

  constructor(
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    private articleService: ArticleService,
    private categoryService: CategoryService,
  ) { }


  async ngOnInit(): Promise<void> {

    this.bannerURL = await Storage.get('banners/' + this.article.banner, { validateObjectExistence: true });

  }



}
