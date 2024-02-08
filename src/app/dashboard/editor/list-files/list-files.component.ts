import { Component, Input } from '@angular/core';
import { Article } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrl: './list-files.component.scss'
})
export class ListFilesComponent {
  @Input() article!: Article;

  constructor(
    private articleService: ArticleService,
  ) { }

  directorySelectHandler(event: { id: string, folder: string }) {
    console.log('directorySelectHandler : ~~> %o ', event);
    let article = this.articleService.getArticleById(event.id)!;
    article.directory = event.folder;
  }

  getFolder(article: Article): string {
    return article.directory ? article.directory.replace(environment.S3articlesDirectory, '') : '';
  }

  getRoot() {
    return environment.S3articlesDirectory;
  }

}
