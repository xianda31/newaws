import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleInputComponent } from '../value_accessors/toggle-input/toggle-input.component';
import { Editor } from 'tinymce';
import { FilesizePipe } from 'src/app/pipes/filesize.pipe';
import { FilesComponent } from '../files/files.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { NgbActiveModal, NgbModal, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GetDateComponent } from 'src/app/dashboard/publications/pages/get-date/get-date.component';
import { BucketnamePipe } from '../../pipes/bucketname.pipe';
import { SmallerPipe } from 'src/app/pipes/smaller.pipe';
import { ViewerInputComponent } from '../value_accessors/viewer-input/viewer-input.component';
import { CarderComponent } from 'src/app/layout/dynamic_pages/carder/carder.component';
import { IconsTogglerInputComponent } from '../value_accessors/icons-toggler-input/icons-toggler-input.component';
import { RightsInputComponent } from '../value_accessors/rights-input/rights-input.component';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { ImageComponent } from '../image/image.component';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    ToggleInputComponent,
    ViewerInputComponent,
    FilesComponent,
    RightsInputComponent,
    IconsTogglerInputComponent,
    GetDateComponent,
    CarderComponent,
    ImageComponent,
    FilesizePipe,
    SafeHtmlPipe,
    BucketnamePipe,
    SmallerPipe,
    OrderByPipe
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
    IconsTogglerInputComponent,
    FilesComponent,
    CarderComponent,
    FormsModule,
    ReactiveFormsModule,
    FilesizePipe,
    SafeHtmlPipe,
    SmallerPipe,
    OrderByPipe


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
