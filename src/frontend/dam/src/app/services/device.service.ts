import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Device } from '../interfaces/device';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  private urlApiDevices = 'http://localhost:8000/devices';
  httpClient = inject(HttpClient);

  // Obtener listado de dispositivos
  async getDevices(): Promise<Device[]> {
    try {
      const response = await firstValueFrom(this.httpClient.get<Device[]>(this.urlApiDevices));
      return response || [];
    } catch (error) {
      console.error('Error al obtener los dispositivos:', error);
      return [];
    }
  }

  constructor() { }
}
