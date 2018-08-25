//Core Imports
import {
  NgModule
} from '@angular/core';

import {
  RouterModule,
  Routes
} from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/log-in',
    pathMatch: 'full'
  },
  {
    path: 'log-in',
    component: LogInComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
