import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { Subject, AsyncSubject } from 'rxjs';
import tinymce from 'tinymce';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
  
export class EditComponent {
  @Input() control!: FormControl;
  
  useDarkMode = false;  //window.matchMedia('(prefers-color-scheme: dark)').matches;
  isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;
  
  tinyMCEconfig: any = {
    base_url: '/tinymce',
    suffix: '.min',
    height: 380,
    menubar: true,
    plugins:  'preview  searchreplace autolink autosave save' +
              '  code visualblocks visualchars ' +
      ' fullscreen image link table  pagebreak nonbreaking  advlist lists quickbars ',
    
    toolbar: // 'undo redo |' + 
      'save |' +
      ' bold italic underline strikethrough |' +
      'fontfamily fontsize blocks |' + 
      ' alignleft aligncenter alignright alignjustify |' +
      'outdent indent pagebreak | ' +
      'numlist bullist | ' +
      'forecolor backcolor removeformat |' +
      'fullscreen  preview ' + 
      ' insertfile image template link ',
    
    toolbar_sticky: true,
    ui_mode: 'split',
    importcss_append: false,
    
    quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    noneditable_class: 'mceNonEditable',
    toolbar_mode: 'sliding',
    contextmenu: 'link image table',
    skin: this.useDarkMode ? 'oxide-dark' : 'oxide',
    content_css: this.useDarkMode ? 'dark' : 'default',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
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


    file_picker_callback: this.ImagePickerCallback,
    image_caption: true,
    
    // templates: [
    //     { title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
    //     { title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
    //     { title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
    //   ],
      
    //   template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
    //   template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
    
    };
    
    
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
                  
                  // debugger;
                  
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
    
// sources : 
    // https://www.tiny.cloud/docs/tinymce/6/file-image-upload/
    
    //  plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons',
    // menubar: 'file edit view insert format tools table help',   //default