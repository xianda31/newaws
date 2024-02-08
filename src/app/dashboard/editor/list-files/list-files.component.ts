import { Component, Input, SimpleChanges } from '@angular/core';
import { Article } from 'src/app/API.service';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { FolderItem } from 'src/app/interfaces/files.interface';
import { FileService } from 'src/app/shared/service/file.service';
import { ToastService } from 'src/app/toaster/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrl: './list-files.component.scss'
})
export class ListFilesComponent {
  @Input() article!: Article;

  root_folder: string = '';
  // sub_folder: string = '';

  current_folder: string = '';
  folder_level: number = 0;
  folderItems !: FolderItem[];
  new_folder: string = '';

  constructor(
    private fileService: FileService,
    private toastService: ToastService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const sub_folder = this.article.directory ? this.article.directory.replace(environment.S3articlesDirectory, '') : '';
    this.root_folder = environment.S3articlesDirectory;
    this.current_folder = this.root_folder + sub_folder;
    this.folder_level = sub_folder.split('/').length - 1;
    this.folderItems = this.fileService.genFolderItems(this.current_folder);
  }

  ngOnInit(): void {
  };

  onSelectItem(item: FolderItem) {
    if (item.__isFile) {
      this.showFile(item);
    } else {
      this.folderDown(item);
    }
  }

  onDeleteItem(item: FolderItem) {
    if (item.__isFile) {
      this.deleteFile(item);
    } else {
      this.deleteDirectory(item);
    }
  }


  folderDown(item: FolderItem) {
    this.current_folder += (item.key + '/');
    this.folder_level++;
    this.folderItems = this.fileService.genFolderItems(this.current_folder);
  }
  folderUp() {
    const keys = this.current_folder.split('/');
    this.folder_level--;
    keys.pop();    // suppression du '' final
    keys.pop();    // repA/repB/ => repA/   et repA/ => ''
    this.current_folder = (keys.length === 0) ? '' : keys.join('/') + '/';
    this.folderItems = this.fileService.genFolderItems(this.current_folder);
  }

  async showFile(item: FolderItem) {
    const signedURL = await this.fileService.getFileURL(this.current_folder + item.key);
    window.open(signedURL as string);

  }

  async uploadFile(e: any) {
    const newfile = e.target.files[0];
    if (newfile !== undefined) {
      const key = this.current_folder + newfile.name;
      await this.fileService.uploadFile(key, newfile)
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
    }
  }

  async createFolder() {
    if (this.new_folder !== '') {
      const key = this.current_folder + this.new_folder + '/';
      await this.fileService.createDirectory(key)
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
      this.new_folder = '';
    }
  }

  async deleteDirectory(dir: FolderItem) {
    const item = { ...dir };
    item.key += '/';
    this.deleteFile(item);
  }

  async deleteFile(item: FolderItem) {
    this.fileService.deleteFile(this.current_folder + item.key).then((result) => {
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
    })
      .catch((err) => {
        this.toastService.showErrorToast("files", err);
      }
      );
  }


}
