import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { TestComponent } from '../tests/test.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToolsModule } from 'src/app/tools/tools/tools.module';
import { EditComponent } from '../editor/edit.component';
import { FilemgrComponent } from '../filemgr/filemgr.component';
import { PagesComponent } from '../publications/pages/pages/pages.component';
import { PageEditorComponent } from '../publications/pages/page.editor/page.editor.component';
import { GetPictureInfoComponent } from '../publications/pages/get-picture-info/get-picture-info.component';



@NgModule({
  declarations: [
    MembersComponent,
    ArticlesComponent,
    TestComponent,
    EditComponent,
    FilemgrComponent,
    PagesComponent,
    PageEditorComponent,
    GetPictureInfoComponent,
  ],
  imports: [
    CommonModule,
    ToolsModule,
    DashboardRoutingModule,
    HttpClientModule,
    EditorModule,
  ],
  // providers: [
  //   { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  // ]
})
export class DashboardModule { }
