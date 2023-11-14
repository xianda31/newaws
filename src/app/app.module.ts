import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { FooterComponent } from './layouts/footer/footer.component';
import { HeaderComponent } from './layouts/header/header.component';
import { ToastComponent } from './toaster/components/toast/toast.component';
import { ToasterComponent } from './toaster/components/toaster/toaster.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { CardComponent } from './layouts/card/card.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { ToolsModule } from './tools/tools/tools.module';
import { HomeComponent } from './pages/home/home.component';
import { HeadbandComponent } from './pages/headband/headband.component';
import { Page404Component } from './pages/page404/page404.component';
import { LinksComponent } from './pages/links/links.component';
import { RightsComponent } from './tests/rights/rights.component';
import { MyDataComponent } from './pages/my-data/my-data.component';
import { FlashPluginComponent } from './projectors/slider/plugins/flash-plugin/flash-plugin.component';
import { AdDirective } from './projectors/slider/ad.directive';
import { MosaikerComponent } from './projectors/mosaiker/mosaiker.component';
import { CarderComponent } from './projectors/mosaiker/viewers/carder/carder.component';
import { TodoComponent } from './pages/todo/todo.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    ToasterComponent,
    SignupComponent,
    LoginComponent,
    PswresetComponent,
    CardComponent,
    SafeHtmlPipe,
    HomeComponent,
    HeadbandComponent,
    Page404Component,
    LinksComponent,
    RightsComponent,
    MyDataComponent,
    FlashPluginComponent,
    AdDirective,
    MosaikerComponent,
    CarderComponent,
    TodoComponent,


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
