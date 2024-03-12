import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleInputComponent } from './value-accessors/toggle-input/toggle-input.component';
import { Editor } from 'tinymce';
import { FilesizePipe } from 'src/app/pipes/filesize.pipe';
import { FilesComponent } from '../tools/files/files.component';
import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';
import { NgbActiveModal, NgbModal, NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { GetDateComponent } from 'src/app/shared/modals/get-date/get-date.component';
import { BucketnamePipe } from '../pipes/bucketname.pipe';
import { SmallerPipe } from 'src/app/pipes/smaller.pipe';
import { ViewerInputComponent } from './value-accessors/viewer-input/viewer-input.component';
import { IconsTogglerInputComponent } from './value-accessors/icons-toggler-input/icons-toggler-input.component';
import { OrderByPipe } from 'src/app/pipes/order-by.pipe';
import { ImageComponent } from '../tools/image/image.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { GetMenuNameComponent } from 'src/app/shared/modals/get-menu-name/get-menu-name.component';
import { GetArticleNameComponent } from 'src/app/shared/modals/get-article-name/get-article-name.component';
import { ListFilesComponent } from '../dashboard/editor/list-files/list-files.component';
import { PageTitleComponent } from '../layout/page-title/page-title.component';
import { RightsInputComponent } from './value-accessors/rights-input/rights-input.component';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    ToggleInputComponent,
    ViewerInputComponent,
    FilesComponent,
    RightsInputComponent,
    IconsTogglerInputComponent,
    GetDateComponent,
    GetMenuNameComponent,
    GetArticleNameComponent,
    ImageComponent,
    ListFilesComponent,
    PageTitleComponent,
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
    NgbTypeaheadModule,
    DragDropModule,
  ],

  exports: [
    ToggleInputComponent,
    RightsInputComponent,
    ViewerInputComponent,
    IconsTogglerInputComponent,
    FilesComponent,
    ImageComponent,
    ListFilesComponent,
    PageTitleComponent,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    FilesizePipe,
    SafeHtmlPipe,
    SmallerPipe,
    OrderByPipe,
    BucketnamePipe,


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
