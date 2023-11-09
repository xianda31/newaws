import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../publications/pages/pages.component';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
import { ArticleComponent } from '../publications/articles/article/article.component';
import { TestComponent } from '../tests/test.component';
import { FilemgrComponent } from '../filemgr/filemgr.component';
import { RightsComponent } from 'src/app/tests/rights/rights.component';
import { canActivateGuard } from 'src/app/guards/can-activate.guard';

const routes: Routes = [

  {
    path: 'admin', canActivate: [canActivateGuard('Admin')], children: [
      { path: 'members', component: MembersComponent },]
  },

  { path: 'tests/tiny', component: TestComponent },
  { path: 'tests/rights', component: RightsComponent },

  {
    path: 'publisher', canActivate: [canActivateGuard('Publisher')], children: [
      { path: 'pages', component: PagesComponent },
      { path: 'articles', component: ArticlesComponent },
      { path: 'articles/new', component: ArticleComponent },
      { path: 'articles/:id', component: ArticleComponent },
      { path: 'files', component: FilemgrComponent },]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
