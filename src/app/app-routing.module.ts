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



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'front/home' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'me', component: MyDataComponent },
  { path: 'pswreset/:email', component: PswresetComponent },
  {
    path: 'dashboard',
    canActivate: [canActivateGuard('any right')],
    loadChildren: () => import('./dashboard/modules/dashboard.module').then(m => m.DashboardModule)
  },
  { path: 'links', component: LinksComponent },
  { path: 'todo', component: TodoComponent },
  { path: '404', component: Page404Component },

  // // add site's modifiable pages to the routes
  // for (let key in _compDirectory) {
  //   // console.log('component', key, _compDirectory[key]);
  //   AppRoutes.unshift(_compDirectory[key]);
  // };

  { path: 'front/:root/:menu', component: PagerComponent },
  { path: 'front/:menu', component: PagerComponent },

  { path: '**', redirectTo: 'front/home' },
];
// return AppRoutes;

// }

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
