import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { MemberListComponent } from '../members/member.list/member.list.component';
// import { IsPublisherGuard } from 'src/app/guards/ispublisher.guard';
// import { IsMemberMgrGuard } from 'src/app/guards/ismemberMgr.guard';
import { CategoriesComponent } from '../publications/categories/categories.component';
// import { TestComponent } from '../test/test.component';

const routes: Routes = [
  // { path: 'members', component: MemberListComponent, canActivate: [IsMemberMgrGuard] },
  { path: 'publication/categories', component: CategoriesComponent } //, canActivate: [IsPublisherGuard] },
  // { path: 'publication/articles', component: ArticlesComponent, canActivate: [IsPublisherGuard] },
  // { path: 'publication/articles/new', component: NewArticleComponent },
  // { path: 'test', component: TestComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
