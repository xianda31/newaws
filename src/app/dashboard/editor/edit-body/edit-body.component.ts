import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Article } from 'src/app/API.service';
import { environment } from 'src/environments/environment';
import tinymce, { Editor } from 'tinymce';
import { Storage } from 'aws-amplify/lib-esm';
import { ArticleService } from 'src/app/aws.services/article.aws.service';
import { FolderItem } from 'src/app/interfaces/files.interface';
import { FileService } from 'src/app/shared/service/file.service';



@Component({
  selector: 'app-edit-body',
  templateUrl: './edit-body.component.html',
  styleUrl: './edit-body.component.scss'
})
export class EditBodyComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() article !: Article;
  // headlineEditor: Editor | null = null;
  bodyEditor: Editor | null = null;
  host: string = 'https://' + environment.BucketName + '.s3.' + environment.Region + '.amazonaws.com';
  link_list: { title: string; value: string; }[] = [];
  folderItems !: FolderItem[];

  constructor(
    private articleService: ArticleService,
    private fileService: FileService,
  ) { }
  ngOnInit(): void {
    this.folderItems = this.fileService.listAllFiles(environment.S3articlesDirectory);
    this.folderItems.forEach((item) => {
      // console.log('item : %s', item.key);
      this.link_list.push({ title: this.fileService.extractFilename(item.key), value: this.host + '/public/' + item.key });
    });
  }

  ngAfterViewInit(): void {
    this.openEditors();
  }
  ngOnDestroy(): void {
    this.removeEditors();
  }

  openEditors() {
    const bodyId = document.getElementById('bodyArea' + this.article.id);
    if (!bodyId) return;
    this.initBodyEditor(bodyId);
  }

  removeEditors() {
    this.bodyEditor?.remove();
  }

  bodySave(html: SafeHtml): void {
    this.article!.body = html.toString().replaceAll(this.host, '%HOSTNAME%');
    this.articleService.updateArticle(this.article!);
  }

  fetchLinkList = () => this.link_list;


  initBodyEditor(el: HTMLElement) {

    tinymce.init(
      {
        target: el,
        inline: false,
        plugins: 'anchor autolink link lists image code save wordcount table',  //
        menubar: 'edit table insert view format tools',
        toolbar: 'undo redo save | table | blocks | bold italic strikethrough backcolor | mergetags | link image | align bullist numlist | code ',
        table_toolbar: 'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
        toolbar_location: 'bottom',
        height: 300,
        image_caption: true,
        link_context_toolbar: true,
        link_title: false,
        // link_quicklink: true,
        link_target_list: [
          { title: 'New window', value: '_blank' }
        ],
        link_list: (success: (arg0: { title: string; value: string; }[]) => void) => { // called on link dialog open
          const links = this.fetchLinkList(); // get link_list data
          success(links);
        },

        save_onsavecallback: () => {
          let content = tinymce.activeEditor!.getContent();
          this.bodySave(content);
        },

        file_picker_callback: (callback, value, meta) => { this.ImagePickerCallback(callback, value, meta) },

        images_upload_handler: (blobInfo: { filename: () => string; blob: () => any; }): Promise<string> => {
          return (this.uploadImage(blobInfo));
        },

      }).then((editors) => {
        if (editors.length === 0) { console.log('initBodyEditor failed on'); }
        else { this.bodyEditor = editors[0]; }
      });
  }


  uploadImage(blobInfo: { filename: () => string; blob: () => any; }): Promise<string> {
    return new Promise((resolve, reject) => {
      const key = 'images/' + this.article!.title + '/' + blobInfo.filename();
      Storage.put(key, blobInfo.blob(), {
        level: 'public',
        // contentType: blobInfo.blob().type,
        // progressCallback(progress: any) {
        //   // console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
        // },
      })
        .then((result) => {
          console.log('image_upload_handler : S3 result:%o ', result);
          // resolve(this.buildURL(result.key));
          resolve(this.host + '/public/' + result.key);

        })
        .catch((err) => {
          console.log('image_upload_handler : S3 error:%o ', err);
          reject(err);
        });
    });
  }

  ImagePickerCallback(cb: (blobUri: string, arg1: { title: string; }) => void, value: any, meta: any): void {
    // create an off-screen canvas
    const canvas = document.createElement('canvas');

    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.addEventListener('change', (e: any) => {
      const file = e.target.files[0] as File;
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const id = file.name;  //+ (new Date()).getTime();
        const image64 = e.target.result;
        const base64 = image64.split(',')[1];

        const blobCache = tinymce.activeEditor!.editorUpload.blobCache;

        // console.log('ImagePickerCallback : sauvegarde en cache de %o, sous reference id %s', file, id);
        const blobInfo = blobCache.create(id, file, base64, id, id);
        blobCache.add(blobInfo);
        /* call the callback and populate the Title field with the file name */
        // console.log('ImagePickerCallback : appel du callback avec blobUri %s et title: %s', blobInfo.blobUri(), id);
        cb(blobInfo.blobUri(), { title: id });
      };

      reader.readAsDataURL(file);
    });

    input.click();

  }

}
