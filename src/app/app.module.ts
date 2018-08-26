import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LogInComponent } from './log-in/log-in.component';

import {
  ToastModule, ToastOptions
} from 'ng2-toastr/ng2-toastr';

import {
  TooltipModule
} from 'ngx-bootstrap/tooltip';

import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import { CustomOption } from './toast-option';
import { UserService } from './shared/services/user.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  CollapseModule
} from 'ngx-bootstrap/collapse';
import { SignUpComponent } from './sign-up';
import { HomePageComponent } from './home-page/home-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CharacterPageComponent } from './character-page/character-page.component';
import { BadgeModal } from './shared/pages/badge-modal/badge-modal';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    BadgeModal,
    CharacterPageComponent,
    HomePageComponent,
    LogInComponent,
    SignUpComponent,
    HomePageComponent,
    NavbarComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    HttpClientModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    ToastModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    UserService,
    BsModalService,
    { provide: ToastOptions, useClass: CustomOption }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
