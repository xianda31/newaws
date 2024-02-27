import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding, withDebugTracing } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { Page404Component } from './layout/static_pages/page404/page404.component';
import { canActivateGuard } from './guards/can-activate.guard';
import { MyDataComponent } from './layout/static_pages/my-data/my-data.component';
import { PagerComponent } from './layout/dynamic_pages/pager/pager.component';
import { TodoComponent } from './layout/static_pages/todo/todo.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { FrontPageComponent } from './layout/front-page/front-page.component';



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/front/home' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MyDataComponent },
  { path: 'pswreset/:email', component: PswresetComponent },
  {
    path: 'back',
    canActivate: [canActivateGuard('any right')],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/modules/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'todo', component: TodoComponent },
  { path: '404', component: Page404Component },


  { path: 'front/:root/:menu', component: FrontPageComponent },
  { path: 'front/:menu', component: FrontPageComponent },

  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
