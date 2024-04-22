import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MembersComponent } from '../members/members.component';
import { canActivateGuard } from 'src/app/guards/can-activate.guard';
import { CleanupComponent } from '../cleanup/cleanup.component';
import { EditSiteComponent } from '../editor/edit-site/edit-site.component';
import { ListTournamentsComponent } from 'src/app/ffb/tournaments/list-tournaments/list-tournaments.component';

const routes: Routes = [

  {
    path: 'admin', canActivate: [canActivateGuard('Admin')], children: [
      { path: 'members', component: MembersComponent },]
  },


  {
    path: 'publisher', canActivate: [canActivateGuard('Publisher')], children: [
      { path: 'cleanup', component: CleanupComponent },
      { path: 'editor', component: EditSiteComponent },
      { path: 'tournaments', component: ListTournamentsComponent }
    ]
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
