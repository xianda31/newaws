import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SingleCategoryComponent } from './pages/single-category/single-category.component';
import { ToastComponent } from './toaster/components/toast/toast.component';
import { ToasterComponent } from './toaster/components/toaster/toaster.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { CardComponent } from './layouts/card/card.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PageComponent } from './pages/page/page.component';
import { ToolsModule } from './tools/tools/tools.module';
import { HomeComponent } from './pages/home/home.component';
import { HeadbandComponent } from './pages/headband/headband.component';
import { Page404Component } from './pages/page404/page404.component';
import { LinksComponent } from './pages/links/links.component';
import { RightsComponent } from './tests/rights/rights.component';
// import { RightsInputComponent } from './tools/rights-input/rights-input.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SingleCategoryComponent,
    FooterComponent,
    ToastComponent,
    ToasterComponent,
    SignupComponent,
    LoginComponent,
    PswresetComponent,
    CardComponent,
    SafeHtmlPipe,
    PageComponent,
    HomeComponent,
    HeadbandComponent,
    Page404Component,
    LinksComponent,
    RightsComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolsModule
  ],


  providers: [SafeHtmlPipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
