import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
// import { HomeComponent } from './pages/home/home.component';
import { Page404Component } from './pages/page404/page404.component';
import { LinksComponent } from './pages/links/links.component';
import { canActivateGuard } from './guards/can-activate.guard';
import { MyDataComponent } from './pages/my-data/my-data.component';
import { MosaikerComponent } from './projectors/mosaiker/mosaiker.component';
import { TodoComponent } from './pages/todo/todo.component';

export const _compDirectory: any = {
  "board": { path: 'multi/:category', component: MosaikerComponent },
  "single": { path: 'multi/:category', component: MosaikerComponent },

  // "single": { path: 'page/:cat', component: SingleCategoryComponent },
  "links": { path: 'links', component: LinksComponent },
  "todo": { path: 'todo', component: TodoComponent },
  "404": { path: '404', component: Page404Component },
};

function getRoutes(): Routes {


  const AppRoutes: Routes = [
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'me', component: MyDataComponent },
    { path: 'pswreset/:email', component: PswresetComponent },
    {
      path: 'dashboard',
      canActivate: [canActivateGuard('any right')],
      loadChildren: () => import('./dashboard/modules/dashboard.module').then(m => m.DashboardModule)
    },
    // { path: '404', component: Page404Component },
    { path: '**', component: Page404Component },


  ];

  // add site's modifiable pages to the routes
  for (let key in _compDirectory) {
    // console.log('component', key, _compDirectory[key]);
    AppRoutes.unshift(_compDirectory[key]);
  };

  return AppRoutes;

}

@NgModule({
  imports: [RouterModule.forRoot([], { enableTracing: false })],
  exports: [RouterModule],
  providers: [provideRouter(getRoutes(), withComponentInputBinding())]
})
export class AppRoutingModule { }
