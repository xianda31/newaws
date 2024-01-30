import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastComponent } from './toaster/components/toast/toast.component';
import { ToasterComponent } from './toaster/components/toaster/toaster.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { PswresetComponent } from './authentication/pswreset/pswreset.component';
import { ToolsModule } from './tools/module/tools.module';
import { Page404Component } from './layout/static_pages/page404/page404.component';
import { RightsComponent } from './tests/rights/rights.component';
import { MyDataComponent } from './layout/static_pages/my-data/my-data.component';
import { TodoComponent } from './layout/static_pages/todo/todo.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CleanupComponent } from './dashboard/cleanup/cleanup.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { PagerComponent } from './layout/dynamic_pages/pager/pager.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { DynamicMenuComponent } from './layout/dynamic-menu/dynamic-menu.component';

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
    Page404Component,
    RightsComponent,
    MyDataComponent,
    TodoComponent,
    PagerComponent,
    CleanupComponent,
    DashboardComponent,
    DynamicMenuComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToolsModule,
    NgbModule
  ],


  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
