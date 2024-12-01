import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then((m) => m.MainPage),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'device/:id',
    loadComponent: () => import('./pages/devices/devices.page').then( m => m.DevicesPage)
  },
  {
    path: 'device/data/:id',
    loadComponent: () => import('./pages/measurements/measurements.page').then( m => m.MeasurementsPage)
  },
];
