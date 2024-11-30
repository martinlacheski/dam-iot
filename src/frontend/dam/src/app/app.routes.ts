import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Main',
    loadComponent: () => import('./pages/main/main.page').then((m) => m.MainPage),
  },
  {
    path: '',
    redirectTo: 'Main',
    pathMatch: 'full',
  },
  {
    path: 'devices',
    loadComponent: () => import('./pages/devices/devices.page').then( m => m.DevicesPage)
  },
];
