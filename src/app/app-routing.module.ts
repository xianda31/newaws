import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';

const routes: Routes = [
  { path: '', component: SingleCategoryComponent },
  { path: 'home', component: SingleCategoryComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'category/:id', component: SingleCategoryComponent },
  { path: 'pswreset/:email', component: PswresetComponent },
  {
    path: 'dashboard',
    // canActivate: [IsAuthenticatedGuard],
    loadChildren: () => import('./dashboard/modules/dashboard.module').then(m => m.DashboardModule)

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
