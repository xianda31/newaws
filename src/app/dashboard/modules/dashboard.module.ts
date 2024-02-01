import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MembersComponent } from '../members/members.component';
// import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { TestComponent } from '../tests/test.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ToolsModule } from 'src/app/tools/module/tools.module';
import { FilemgrComponent } from '../filemgr/filemgr.component';
import { PagesComponent } from '../publications/pages/pages/pages.component';
import { PageEditorComponent } from '../publications/pages/page.editor/page.editor/page.editor.component';
import { GetPictureInfoComponent } from '../publications/pages/get-picture-info/get-picture-info.component';
import { GetDirectoryComponent } from '../publications/pages/get-directory/get-directory.component';
import { ListMenusComponent } from '../editor/list-menus/list-menus.component';
import { ListPagesComponent } from '../editor/list-pages/list-pages.component';
import { EditSiteComponent } from '../editor/edit-site/edit-site.component';
import { EditPageComponent } from '../editor/edit-page/edit-page.component';
import { EditArticleComponent } from '../editor/edit-article/edit-article.component';
import { ListArticlesComponent } from '../editor/list-articles/list-articles.component';
import { EditTextComponent } from '../editor/edit-text/edit-text.component';



@NgModule({
  declarations: [
    MembersComponent,
    // ArticlesComponent,
    TestComponent,
    FilemgrComponent,
    PagesComponent,
    PageEditorComponent,
    GetPictureInfoComponent,
    GetDirectoryComponent,
    ListPagesComponent,
    EditPageComponent,
    ListMenusComponent,
    EditSiteComponent,
    EditArticleComponent,
    ListArticlesComponent,
    EditTextComponent
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
