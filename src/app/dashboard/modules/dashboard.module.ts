import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from '../publications/categories/categories.component';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { NewArticleComponent } from '../publications/articles/new-article/new-article.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TestComponent } from '../test/test.component';



@NgModule({
  declarations: [
    MembersComponent,
    CategoriesComponent,
    ArticlesComponent,
    NewArticleComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
    HttpClientModule,
    AngularEditorModule
  ]
})
export class DashboardModule { }
