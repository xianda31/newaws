import { Component, EventEmitter, Input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FolderItem } from 'src/app/interfaces/files.interface';
import { FileService } from 'src/app/tools/service/file.service';
import { ToastService } from '../service/toast.service';



@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})

export class FilesComponent implements OnInit, OnChanges {

  @Input() root_folder: string = '';
  @Input() full_rights: boolean = false;
  @Input() arbo_only: boolean = false;
  @Input() sub_folder: string = '';
  @Output() newPathEvent = new EventEmitter<string>();

  current_folder: string = '';
  folder_level: number = 0;
  folderItems !: FolderItem[];
  new_folder: string = '';

  constructor(
    private fileService: FileService,
    private toastService: ToastService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['sub_folder'].firstChange) {
      this.current_folder = this.root_folder + this.sub_folder;
      this.folder_level = this.sub_folder.split('/').length;
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
    }
  }

  ngOnInit(): void {
    this.current_folder = this.root_folder;
    this.newPathEvent.emit(this.current_folder);

    this.fileService.bucketLoaded.subscribe((loaded) => {
      if (loaded) {
        this.folderItems = this.fileService.genFolderItems(this.current_folder);
      };
    });
  };

  // navigation dans l'arborescence

  folderDown(item: FolderItem) {
    this.current_folder += (item.key + '/');
    this.newPathEvent.emit(this.current_folder);

    this.folder_level++;
    this.folderItems = this.fileService.genFolderItems(this.current_folder);
  }

  async selectFile(item: FolderItem) {
    const signedURL = await this.fileService.getFileURL(this.current_folder + item.key);
    window.open(signedURL as string);

  }

  folderUp() {
    const keys = this.current_folder.split('/');
    this.folder_level--;
    keys.pop();    // suppression du '' final
    keys.pop();    // repA/repB/ => repA/   et repA/ => ''
    this.current_folder = (keys.length === 0) ? '' : keys.join('/') + '/';
    this.newPathEvent.emit(this.current_folder);

    this.folderItems = this.fileService.genFolderItems(this.current_folder);
  }

  // uplooad fichier

  async uploadFile(e: any) {
    const newfile = e.target.files[0];
    if (newfile !== undefined) {
      const key = this.current_folder + newfile.name;
      await this.fileService.uploadFile(key, newfile)
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
    }
  }

  // modification de l'arborescence

  async createFolder() {
    if (this.new_folder !== '') {
      const key = this.current_folder + this.new_folder + '/';
      await this.fileService.createDirectory(key)
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
    }
  }

  async deleteDirectory(dir: FolderItem) {
    const item = { ...dir };
    item.key += '/';
    this.deleteFile(item);
  }

  async deleteFile(item: FolderItem) {
    this.fileService.deleteFile(this.current_folder + item.key).then((result) => {
      this.toastService.showSuccessToast("files", "Fichier supprimé");
      this.folderItems = this.fileService.genFolderItems(this.current_folder);
    })
      .catch((err) => {
        this.toastService.showErrorToast("files", err);
      }
      );
  }



}





