import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/tools/service/file.service';
import { Storage } from 'aws-amplify/lib-esm';
import { Observable } from 'dist/bcsto/tinymce/tinymce';
import { Subject } from 'rxjs';


interface FolderItem {
  key: string;
  lastModified: number;
  size: number;
  __isFile: boolean;
}

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})

export class FilesComponent implements OnInit {

  bucket!: any;
  folderItems !: FolderItem[];
  folder_path: string = ''
  new_folder: string = '';

  constructor(
    private fileService: FileService
  ) { }


  ngOnInit(): void {
    // acquiert le bucket S3 et le transforme en arborescence (récursive) 
    this.fileService.loadBucket().subscribe((res) => {
      this.bucket = res;
      this.genFolderData('');
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

  createFolder() {
    if (this.new_folder !== '') {
      const key = this.folder_path + this.new_folder + '/';
      Storage.put(key, '', { level: 'public' })
        .then((result) => {
          this.bucket.push({ key: key, lastModified: Date.now(), size: 0, __isFile: false });
          this.genFolderData(this.folder_path);
        })
        .catch((err) => console.log(err));
    }
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

  async deleteDirectory(dir: FolderItem) {
    const item = { ...dir };
    item.key += '/';
    this.deleteFile(item);
  }

  async deleteFile(item: FolderItem) {
    Storage.remove(this.folder_path + item.key, { level: 'public' })
      .then((result) => {
        this.bucket.splice(this.bucket.findIndex((file: any) => file.key === (this.folder_path + item.key)), 1);
        this.genFolderData(this.folder_path);
      })
      .catch((err) => console.log(err));
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





