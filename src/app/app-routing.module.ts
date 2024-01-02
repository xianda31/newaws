import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { Page404Component } from './pages/page404/page404.component';
import { LinksComponent } from './pages/links/links.component';
import { canActivateGuard } from './guards/can-activate.guard';
import { MyDataComponent } from './pages/my-data/my-data.component';
import { PagerComponent } from './layouts/pager/pager/pager.component';
import { TodoComponent } from './pages/todo/todo.component';
import { PageService } from './aws.services/page.aws.service';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/todo' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MyDataComponent },
  { path: 'pswreset/:email', component: PswresetComponent },
  {
    path: 'dashboard',
    canActivate: [canActivateGuard('any right')],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/modules/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'links', component: LinksComponent },
  { path: 'todo', component: TodoComponent },
  { path: '404', component: Page404Component },


  { path: 'front/:root/:menu', component: PagerComponent },
  { path: 'front/:menu', component: PagerComponent },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
