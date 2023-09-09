import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from '../publications/categories/categories.component';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { ArticleComponent } from '../publications/articles/article/article.component';
import { TestComponent } from '../test/test.component';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { EditorComponent } from '../editor/editor.component';
// import { SafeHtmlPipe } from 'src/app/pipes/safe-html.pipe';



@NgModule({
  declarations: [
    MembersComponent,
    CategoriesComponent,
    ArticlesComponent,
    ArticleComponent,
    TestComponent,
    EditorComponent,
    // SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    EditorModule,

  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ]
})
export class DashboardModule { }
