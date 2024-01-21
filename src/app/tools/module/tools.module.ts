import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleInputComponent } from '../toggle-input/toggle-input.component';
import { Editor } from 'tinymce';
import { FilesizePipe } from 'src/app/pipes/filesize.pipe';
import { FilesComponent } from '../files/files.component';
import { RightsInputComponent } from '../rights-input/rights-input.component';
import { CarderComponent } from 'src/app/layouts/carder/carder.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { NgbActiveModal, NgbModal, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GetDateComponent } from 'src/app/dashboard/publications/pages/get-date/get-date.component';
import { BucketnamePipe } from '../../pipes/bucketname.pipe';
import { SmallerPipe } from 'src/app/pipes/smaller.pipe';
import { ViewerInputComponent } from '../viewer-input/viewer-input.component';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    ToggleInputComponent,
    ViewerInputComponent,
    FilesComponent,
    RightsInputComponent,
    GetDateComponent,
    CarderComponent,
    FilesizePipe,
    SafeHtmlPipe,
    BucketnamePipe,
    SmallerPipe,
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
    ViewerInputComponent,
    FilesComponent,
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
