import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from '../publications/pages/pages/pages.component';
import { MembersComponent } from '../members/members.component';
import { TestComponent } from '../tests/test.component';
import { FilemgrComponent } from '../filemgr/filemgr.component';
import { RightsComponent } from 'src/app/tests/rights/rights.component';
import { canActivateGuard } from 'src/app/guards/can-activate.guard';
import { PageEditorComponent } from '../publications/pages/page.editor/page.editor/page.editor.component';
import { CleanupComponent } from '../cleanup/cleanup.component';
import { EditPagesComponent } from '../editor/edit-pages/edit-pages.component';

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
      { path: 'cleanup', component: CleanupComponent },
      { path: 'pages/:id', component: PageEditorComponent },
      { path: 'files', component: FilemgrComponent },
      { path: 'editor', component: EditPagesComponent },
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
