import { Routes } from '@angular/router';

export const routes: Routes = [
  // Ruta principal
  {
    path: 'main',
    loadComponent: () => import('./pages/main/main.page').then((m) => m.MainPage),
  },
  // Ruta principal
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  // Ruta dispositivo
  {
    path: 'device/:id',
    loadComponent: () => import('./pages/devices/devices.page').then( m => m.DevicesPage)
  },
  // Ruta mediciones del dispositivo
  {
    path: 'device/data/:id',
    loadComponent: () => import('./pages/measurements/measurements.page').then( m => m.MeasurementsPage)
  },
];
