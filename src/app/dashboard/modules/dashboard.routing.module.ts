import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../publications/pages/pages.component';
import { MembersComponent } from '../members/members.component';
import { ArticlesComponent } from '../publications/articles/articles/articles.component';
// import { ArticleComponent } from '../publications/articles/article/article.component';
import { TestComponent } from '../tests/test.component';
import { FilemgrComponent } from '../filemgr/filemgr.component';
import { RightsComponent } from 'src/app/tests/rights/rights.component';
import { canActivateGuard } from 'src/app/guards/can-activate.guard';
// import { MigArticlesComponent } from 'src/app/tests/mig-articles/mig-articles.component';
// import { PicturesComponent } from '../images/pictures.component';
import { PageEditorComponent } from '../publications/pages/page.editor/page.editor.component';

const routes: Routes = [

  {
    path: 'admin', canActivate: [canActivateGuard('Admin')], children: [
      { path: 'members', component: MembersComponent },]
  },

  { path: 'tests/tiny', component: TestComponent },
  { path: 'tests/rights', component: RightsComponent },
  // { path: 'tests/mig-articles', component: MigArticlesComponent },

  {
    path: 'publisher', canActivate: [canActivateGuard('Publisher')], children: [
      { path: 'pages', component: PagesComponent },
      { path: 'pages/:id', component: PageEditorComponent },
      { path: 'articles', component: ArticlesComponent },
      // { path: 'articles/new', component: ArticleComponent },
      // { path: 'articles/:id', component: ArticleComponent },
      // { path: 'images', component: PicturesComponent },
      // { path: 'images/new', component: ArticleComponent },
      // { path: 'images/:id', component: ArticleComponent },
      { path: 'files', component: FilemgrComponent },
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
