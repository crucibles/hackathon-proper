//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up';
import { HomePageComponent } from './home-page/home-page.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'home-page',
    component: HomePageComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
