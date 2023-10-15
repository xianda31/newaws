import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { Page404Component } from './pages/page404/page404.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cat/:cat', component: SingleCategoryComponent },
  { path: 'cat/:cat/:aid', component: SingleCategoryComponent },
  // { path: 'pages/:id', component: PageComponent },
  { path: 'pswreset/:email', component: PswresetComponent },
  {
    path: 'dashboard',
    //   // canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./dashboard/modules/dashboard.module').then(m => m.DashboardModule)
  },
  { path: '404', component: Page404Component },
  { path: '**', component: Page404Component },


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { bindToComponentInputs: true })],
  exports: [RouterModule],
  providers: [provideRouter(routes, withComponentInputBinding())]
})
export class AppRoutingModule { }
