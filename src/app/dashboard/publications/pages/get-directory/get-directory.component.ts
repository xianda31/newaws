import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Article } from 'src/app/API.service';
import { FolderItem } from 'src/app/interfaces/files.interface';
import { FileService } from 'src/app/tools/service/file.service';

@Component({
  selector: 'app-get-directory',
  templateUrl: './get-directory.component.html',
  styleUrls: ['./get-directory.component.scss']
})
export class GetDirectoryComponent implements OnInit {
  @Input() article!: Article;
  folderItems !: FolderItem[];

  dirForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private fileService: FileService,

  ) { }

  ngOnInit(): void {
    // console.log('GetDirectoryComponent', this.article);
    let dir = this.article.directory ?? '';
    dir = dir.replace('documents/', '');
    this.dirForm = new FormGroup({
      directory: new FormControl(dir, [Validators.required, Validators.minLength(3)]),
    });
    this.fileService.bucketLoaded.subscribe((loaded) => {
      if (loaded) {
        this.folderItems = this.fileService.genFolderItems('documents/');
        console.log('folderItems', this.folderItems)
      };
    });

  }
  folderDown(item: FolderItem) {
    console.log('folderDown', item);
    this.dirForm.setValue({ directory: item.key });
    this.folderItems = this.fileService.genFolderItems(item.key);
  }


  onSubmit() {
    // console.log('GetDirectoryComponent : directoryChanged', this.directory);
    let dir = this.dirForm.value.directory;
    if (dir.charAt(dir.length - 1) !== '/') { dir = dir + '/' };

    this.article.directory = "documents/" + dir;
    this.activeModal.close(this.article);
  }

}
