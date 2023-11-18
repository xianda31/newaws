import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleInputComponent } from '../toggle-input/toggle-input.component';
import { Editor } from 'tinymce';
import { FilesizePipe } from 'src/app/pipes/filesize.pipe';
import { FilesComponent } from '../files/files.component';
import { RightsInputComponent } from '../rights-input/rights-input.component';
import { CarderComponent } from 'src/app/layouts/pager/carder/carder.component';
import { AdDirective } from 'src/app/layouts/pager/plugins/ad/ad.directive';
import { FlashPluginComponent } from 'src/app/layouts/pager/plugins/flash-plugin/flash-plugin.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { NgbActiveModal, NgbModal, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { TinyModalComponent } from '../tiny-modal/tiny-modal.component';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    ToggleInputComponent,
    FilesComponent,
    RightsInputComponent,
    FlashPluginComponent,
    AdDirective,
    CarderComponent,
    FilesizePipe,
    SafeHtmlPipe,
    TinyModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbTypeaheadModule
  ],

  exports: [
    ToggleInputComponent,
    RightsInputComponent,
    FilesComponent,
    FlashPluginComponent,
    AdDirective,
    CarderComponent,
    FormsModule,
    ReactiveFormsModule,
    FilesizePipe,
    SafeHtmlPipe,


    // EditorModule
  ],



  providers: [
    NgbModal,
    NgbActiveModal,
  ]
  // providers: [
  //   { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  // ]
})
export class ToolsModule { }
