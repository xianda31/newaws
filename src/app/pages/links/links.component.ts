import { Component } from '@angular/core';
import { Storage } from 'aws-amplify/lib-esm';
import { Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { FileService } from 'src/app/tools/service/file.service';


interface FolderItem {
  key: string;
  lastModified: number;
  size: number;
  __isFile: boolean;
}

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {

  selectedCategory!: Category;

  bucket!: any;
  folderItems !: FolderItem[];
  folder_path: string = 'docs/'
  new_folder: string = '';

  constructor(
    private fileService: FileService,
    private categoryService: CategoryService,

  ) { }


  ngOnInit(): void {

    this.selectedCategory = this.categoryService.getCategoryByLabel('Liens');
    // console.log('this.selectedCategory', this.selectedCategory);
    // acquiert le bucket S3 et le transforme en arborescence (récursive) 
    this.fileService.loadBucket().subscribe((res) => {
      this.bucket = res;
      this.genFolderData('docs/');
    });

  };

  selectFolder(item: FolderItem) {
    this.folder_path += (item.key + '/');
    this.genFolderData(this.folder_path);
  }

  async selectFile(item: FolderItem) {
    const signedURL = await Storage.get(this.folder_path + item.key, { validateObjectExistence: true });
    window.open(signedURL as string);

  }


  uploadFile(e: any) {
    const newfile = e.target.files[0];
    if (newfile !== undefined) {
      const key = this.folder_path + newfile.name;
      Storage.put(key, newfile, { level: 'public' })
        .then((result) => {
          console.log('uploadFile', result);
          this.bucket.push({ key: key, lastModified: Date.now(), size: newfile.size, __isFile: true });
          this.genFolderData(this.folder_path);
        })
        .catch((err) => console.log(err));
    }
  }



  goBack() {
    const keys = this.folder_path.split('/');
    keys.pop();    // suppression du '' final
    keys.pop();    // repA/repB/ => repA/   et repA/ => ''
    this.folder_path = (keys.length === 0) ? '' : keys.join('/') + '/';
    this.genFolderData(this.folder_path);
  }


  genFolderData(folder_path: string) {
    const bucket: any[] = [];
    this.bucket.forEach((item: any) => {
      if (item.key.startsWith(folder_path)) { bucket.push(item); }
    });

    const fitems = this.fileService.processStorageList(bucket, folder_path) as any;

    const keys = Object.keys(fitems);
    this.folderItems = [];

    // d'abord les répertoires
    keys.forEach((key: any) => {
      if (!fitems[key].__isFile) {
        this.folderItems.push({ key: key, lastModified: fitems[key].lastModified, size: fitems[key].__data.size, __isFile: fitems[key].__isFile });
      }
    });
    // puis les fichiers
    keys.forEach((key: any) => {
      if (fitems[key].__isFile) {
        this.folderItems.push({ key: key, lastModified: fitems[key].lastModified, size: fitems[key].__data.size, __isFile: fitems[key].__isFile });
      }
    });


  }
}
