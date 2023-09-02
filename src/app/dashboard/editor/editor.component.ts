import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import tinymce from 'tinymce';

// https://www.tiny.cloud/docs/tinymce/6/file-image-upload/


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent {
  @Input() control!: FormControl;

  useDarkMode = false;  //window.matchMedia('(prefers-color-scheme: dark)').matches;
  isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;


  tinyMCEconfig: any = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 280,
    menubar: false,
    plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link  template codesample table charmap pagebreak nonbreaking  insertdatetime advlist lists wordcount  charmap quickbars ',
    //  plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    // menubar: 'file edit view insert format tools table help',   //default
    toolbar: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
    toolbar_sticky: true,

    image_advtab: true,
    link_list: [
      { title: 'My page 1', value: 'https://picsum.photos/id/10/2500/1667' },
      { title: 'My page 2', value: 'http://www.moxiecode.com' }
    ],
    image_list: [
      { title: 'Img1', value: 'https://picsum.photos/id/10/2500/1667' },
      { title: 'Img2', value: 'https://picsum.photos/id/11/2500/1667' }
    ],
    image_class_list: [
      { title: 'None', value: '' },
      { title: 'Some class', value: 'class-name' }
    ],
    importcss_append: true,
    file_picker_callback: this.ImagePickerCallback,
    templates: [
      { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
      { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
      { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    ],

    template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    image_caption: true,
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: this.useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: this.useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',


  };


  // getImage64(file: File): Promise<string> {
  //   var promise: Promise<string> = new Promise((resolve: (arg0: string) => void) => {
  //     var image64 = '';
  //     const reader = new FileReader();
  //     reader.onload = (e: any) => {
  //       image64 = e.target.result;
  //       resolve(image64);
  //     };
  //     reader.readAsDataURL(file);
  //   });
  //   return promise;
  // }

  ImagePickerCallback(cb: (arg0: string, arg1: { title: string; }) => void, value: any, meta: any): void {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e: any) => {
      // if (input.files && input.files.length > 0) {
      const file = e.target.files[0] as File;
      // }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
        const id = 'blobid' + (new Date()).getTime();
        const blobCache = tinymce.activeEditor!.editorUpload.blobCache;
        const image64 = e.target.result;
        const base64 = image64.split(',')[1];
        const blobInfo = blobCache.create(id, file, base64);
        blobCache.add(blobInfo);

        /* call the callback and populate the Title field with the file name */
        cb(blobInfo.blobUri(), { title: file.name });
      };
      reader.readAsDataURL(file);
    });

    input.click();
  }


}
