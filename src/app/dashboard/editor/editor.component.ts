import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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
    file_picker_callback: (callback: (arg0: string, arg1: { text?: string; alt?: string; source2?: string; poster?: string; }) => void, value: any, meta: { [x: string]: string; }) => {
      /* Provide file and text for the link dialog */
      if (meta['filetype'] === 'file') {
        callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
      }

      /* Provide image and alt text for the image dialog */
      if (meta['filetype'] === 'image') {
        console.log('file_picker_callback');
        callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
      }

      /* Provide alternative source and posted for the media dialog */
      // if (meta['filetype'] === 'media') {
      //   callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
      // }
    },
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

}
