import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { Storage } from 'aws-amplify/lib-esm';


@Component({
  selector: 'app-mig-articles',
  templateUrl: './mig-articles.component.html',
  styleUrls: ['./mig-articles.component.scss']
})
export class MigArticlesComponent implements OnInit {


  articles$: Observable<Article[]> = this.articleService.articles$;
  migForm !: FormGroup;
  bannerURL!: any;

  constructor(
    private articleService: ArticleService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.migForm = new FormGroup({
      title: new FormControl(''),
      banner: new FormControl(''),
      summary: new FormControl(''),
      permalink: new FormControl(''),
      duedate: new FormControl(''),
      featured: new FormControl(''),
      public: new FormControl(''),
      pageId: new FormControl(''),
    });
  }

  loadArticle(article: Article) {
    console.log('loadArticle', article)
    const { page, id, title, createdAt, updatedAt, __typename, ...articleInput } = article;
    this.migForm.patchValue(articleInput);

    this.loadFiles(article).then((signedURL: string) => {
      console.log('signedURL', signedURL);
      this.bannerURL = signedURL;
    }
    )
      .catch((error) => {
        console.log('error %s sur l\'article :', error, article);
      })


  }

  loadFiles(article: Article): Promise<string> {
    // get the banner signed URL
    const filename = 'banners/' + article.banner;
    return Storage.get(filename, { validateObjectExistence: true });

  }

}


