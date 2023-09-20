import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
// import { PostCardComponent } from './layouts/post-card/post-card.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { ToastComponent } from './toaster/components/toast/toast.component';
import { ToasterComponent } from './toaster/components/toaster/toaster.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { CardComponent } from './layouts/card/card.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PageComponent } from './pages/page/page.component';
import { ToolsModule } from './tools/tools/tools.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContactUsComponent,
    SingleCategoryComponent,
    FooterComponent,
    // PostCardComponent,
    ToastComponent,
    ToasterComponent,
    SignupComponent,
    LoginComponent,
    PswresetComponent,
    CardComponent,
    SafeHtmlPipe,
    PageComponent,




  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolsModule
    // FormsModule,
    // ReactiveFormsModule,
    // AmplifyAuthenticatorModule,

  ],


  providers: [SafeHtmlPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
