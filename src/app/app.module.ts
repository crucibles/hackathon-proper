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

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot()
  ],
  providers: [
    { provide: ToastOptions, useClass: CustomOption }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
