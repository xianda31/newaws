import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { ArticleComponent } from '../publications/articles/article/article.component';
import { TestComponent } from '../tests/test.component';
import { EditorComponent, EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
// import { EditorComponent, TinyEditorComponent, TinyMCEComponent } from '../editor/tinyMCE.component';
import { ToolsModule } from 'src/app/tools/tools/tools.module';
import { EditComponent } from '../editor/edit.component';
import { FilemgrComponent } from '../filemgr/filemgr.component';
import { DashHeaderComponent } from '../dash-header/dash-header.component';
import { PagesComponent } from '../publications/pages/pages.component';
import { MigArticlesComponent } from 'src/app/tests/mig-articles/mig-articles.component';



@NgModule({
  declarations: [
    MembersComponent,
    ArticlesComponent,
    ArticleComponent,
    TestComponent,
    EditComponent,
    FilemgrComponent,
    DashHeaderComponent,
    PagesComponent,
    MigArticlesComponent



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
