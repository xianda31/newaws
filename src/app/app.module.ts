import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { Category } from './API.service';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { PostCardComponent } from './layouts/post-card/post-card.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { HomeComponent } from './pages/home/home.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { SinglePostComponent } from './pages/single-post/single-post.component';
import { ToastComponent } from './toaster/components/toast/toast.component';
import { ToasterComponent } from './toaster/components/toaster/toaster.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SinglePostComponent,
    ContactUsComponent,
    SingleCategoryComponent,
    FooterComponent,
    PostCardComponent,
    ToastComponent,
    ToasterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AmplifyAuthenticatorModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
