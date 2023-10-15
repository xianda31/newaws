import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/tools/service/file.service';

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

// acquiert le bucket S3 et le transforme en arborescence (récursive) 
export class FilesComponent implements OnInit {

  bucket!: any;
  folderItems !: FolderItem[];
  folder_path: string = ''

  constructor(
    private fileService: FileService
  ) { }


  ngOnInit(): void {
    this.fileService.loadBucket().subscribe((res) => {
      this.bucket = res;
      this.genFolderData('');
    });
  };

  selectFolder(item: FolderItem) {
    this.folder_path += (item.key + '/');
    this.genFolderData(this.folder_path);
  }

  selectFile(item: FolderItem) {
    console.log('selectFile', item.key)
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

    const folder = this.fileService.processStorageList(bucket, folder_path) as any;
    const keys = Object.keys(folder);
    this.folderItems = [];

    keys.forEach((key: any) => {
      if (!folder[key].__isFile) {
        this.folderItems.push({ key: key, lastModified: folder[key].lastModified, size: folder[key].__data.size, __isFile: folder[key].__isFile });
      }
    });
    keys.forEach((key: any) => {
      if (folder[key].__isFile) {
        this.folderItems.push({ key: key, lastModified: folder[key].lastModified, size: folder[key].__data.size, __isFile: folder[key].__isFile });
      }
    });

  }

}





