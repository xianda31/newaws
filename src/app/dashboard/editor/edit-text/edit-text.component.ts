import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Article } from 'src/app/API.service';
import { environment } from 'src/environments/environment';
import tinymce, { Editor } from 'tinymce';
import { Storage } from 'aws-amplify/lib-esm';
import { ArticleService } from 'src/app/aws.services/article.aws.service';



@Component({
  selector: 'app-edit-text',
  templateUrl: './edit-text.component.html',
  styleUrl: './edit-text.component.scss'
})
export class EditTextComponent implements OnChanges, OnDestroy {

  @Input() article !: Article;
  headlineEditor: Editor | null = null;
  bodyEditor: Editor | null = null;

  constructor(
    private articleService: ArticleService,
  ) { }
  ngOnDestroy(): void {
    this.removeEditors();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.removeEditors();
    this.openEditors();
  }
  // ngOnInit(): void {
  // }

  getMonth(date: string | null | undefined): string {
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];
    if (!date) return '';
    let d = new Date(date);
    let m = d.getMonth();
    return months[m];
    // return date.toLocaleString('fr-FR', { month: 'short' });
  }
  getDayOfTheMonth(date: string | null | undefined): number {
    if (!date) return 0;
    let d = new Date(date);
    return d.getDate();
  }



  openEditors() {
    const headlineId = document.getElementById('headArea');
    if (!headlineId) return;
    this.initHeadLineEditor(headlineId);

    const bodyId = document.getElementById('bodyArea');
    if (!bodyId) return;
    this.initBodyEditor(bodyId);

  }

  removeEditors() {
    this.headlineEditor?.remove();
    this.bodyEditor?.remove();
  }

  headSave(html: SafeHtml): void {
    this.article!.headline = html.toString();
    this.articleService.updateArticle(this.article);
  }

  bodySave(html: SafeHtml): void {
    const BucketName = environment.BucketName;
    const Region = environment.Region;
    const hostname = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com';
    this.article!.body = html.toString().replaceAll(hostname, 'https://HOSTNAME');
    this.articleService.updateArticle(this.article!);
  }

  initHeadLineEditor(el: HTMLElement) {
    // console.log('initHeadLineEditor : %o', el);
    tinymce.init(
      {
        target: el,
        inline: true,
        // height: '200px',
        plugins: '  wordcount save',
        // menubar: 'edit  view format ',
        toolbar: 'undo redo save blocks | bold italic | forecolor |   cancel',
        toolbar_location: 'bottom',

        valid_elements: 'p[style],h*,strong,em,span[style]',
        valid_styles: { '*': 'font-size,font-family,color,text-decoration,text-align' },

        save_onsavecallback: () => { this.headSave(tinymce.activeEditor!.getContent()); },

      }).then((editors) => {
        if (editors.length === 0) {
          console.log('initHeadLineEditor failed with');
        }
        else {
          this.headlineEditor = editors[0];
        }
      });
  }

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


        save_onsavecallback: () => {
          // tinymce.activeEditor!.uploadPictures();
          let content = tinymce.activeEditor!.getContent();
          this.bodySave(content.replaceAll('src="data:image', 'src="https://bcsto.s3.eu-west-3.amazonaws.com/public/images'));
        },

        file_picker_callback: (callback, value, meta) => { this.ImagePickerCallback(callback, value, meta) },

        images_upload_handler: (blobInfo: { filename: () => string; blob: () => any; }): Promise<string> => {
          // console.log('image_upload_handler : ', blobInfo.filename(), blobInfo.blob());

          const buildURL = (key: string) => {
            const BucketName = environment.BucketName;
            const Region = environment.Region;
            const uri = 'https://' + BucketName + '.s3.' + Region + '.amazonaws.com' + '/public/' + key;
            return uri;
          };

          let promise: Promise<string> = new Promise((resolve, reject) => {
            const key = 'images/' + this.article!.title + '/' + blobInfo.filename();
            Storage.put(key, blobInfo.blob(), {
              level: 'public',
              // contentType: blobInfo.blob().type,
              progressCallback(progress: any) {
                // console.log(`Uploaded: ${progress.loaded}/${progress.total}`);
              },
            })
              .then((result) => {
                // console.log('image_upload_handler : S3 result:%o ', result);
                resolve(buildURL(result.key));

              })
              .catch((err) => {
                console.log('image_upload_handler : S3 error:%o ', err);
                reject(err);
              });


          });
          return (promise);
        },

        image_caption: true,
      }).then((editors) => {
        if (editors.length === 0) { console.log('initBodyEditor failed on'); }
        else {
          // console.log('initBodyEditor  initialised');
          this.bodyEditor = editors[0];
        }
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
