import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToggleInputComponent } from '../toggle-input/toggle-input.component';
import { Editor } from 'tinymce';
// import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    ToggleInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // EditorModule
  ],
  exports: [
    ToggleInputComponent,
    FormsModule,
    ReactiveFormsModule,
    // EditorModule
  ],
  // providers: [
  //   { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  // ]
})
export class ToolsModule { }
