import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogInComponent } from './log-in/log-in.component';

import {
  ToastModule, ToastOptions
} from 'ng2-toastr/ng2-toastr';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { CustomOption } from './toast-option';
import { UserService } from './shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  CollapseModule
} from 'ngx-bootstrap/collapse/collapse.module';
import { SignUpComponent } from './sign-up';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    SignUpComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
    UserService,
    { provide: ToastOptions, useClass: CustomOption }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
