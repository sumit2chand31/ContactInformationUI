import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PagenotfoundComponent } from './_component/pagenotfound/pagenotfound.component';

export const routes: Routes = [
  {path:"", loadComponent:()=> import('./_component/_contact/list-contact/list-contact.component').then(m=>m.ListContactComponent)},
  {path:"ListContact", loadComponent:()=> import('./_component/_contact/list-contact/list-contact.component').then(m=>m.ListContactComponent)},
  {path:"**", loadComponent:()=> import('./_component/pagenotfound/pagenotfound.component').then(m=>m.PagenotfoundComponent)},

];
