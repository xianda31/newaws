import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  // { path: 'login', component: LoginComponent },
  // { path: 'signup', component: SignupComponent },
  { path: 'post', component: SinglePostComponent },
  { path: 'category', component: SingleCategoryComponent },
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
