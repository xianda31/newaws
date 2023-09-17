import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MemberListComponent } from '../members/member.list/member.list.component';
// import { IsPublisherGuard } from 'src/app/guards/ispublisher.guard';
// import { IsMemberMgrGuard } from 'src/app/guards/ismemberMgr.guard';
import { CategoriesComponent } from '../publications/categories/categories.component';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { ArticleComponent } from '../publications/articles/article/article.component';
import { IsPublisherGuard } from 'src/app/guards/ispublisher.guard';
import { TestComponent } from '../test/test.component';

const routes: Routes = [
  { path: 'members', component: MembersComponent }, //, canActivate: [IsMemberMgrGuard] },
  { path: 'categories', component: CategoriesComponent }, //, canActivate: [IsPublisherGuard] },
  { path: 'test', component: TestComponent },
  { path: 'articles', component: ArticlesComponent },    // canActivate: [IsPublisherGuard],
  { path: 'articles/new', component: ArticleComponent },
  { path: 'articles/:id', component: ArticleComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
