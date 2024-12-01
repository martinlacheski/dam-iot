import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Device } from '../interfaces/device';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DeviceService {

  private urlApiGetDevices = 'http://localhost:8000/devices';
  private urlApiGetDevice = 'http://localhost:8000/device/';
  private urlApiGetStateValvDevice = 'http://localhost:8000/device/state/';
  private urlApiGetDeviceData = 'http://localhost:8000/device/data/';
  private urlApiPostChangeDeviceState = 'http://localhost:8000/device/change/';
  httpClient = inject(HttpClient);

  // Obtener listado de dispositivos
  async getDevices(): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.get<Device[]>(this.urlApiGetDevices));
      return response || [];
    } catch (error) {
      console.error('Error al obtener los dispositivos:', error);
      return error;
    }
  }

  // Obtener datos del dispositivo
  async getDeviceInfo(id: number): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.get<any>(`${this.urlApiGetDevice}${id}`));
      return response;
    } catch (error) {
      console.error('Error al obtener el dispositivo:', error);
      return error;
    }
  }

  // Obtener estado valvula del dispositivo
  async getStateValve(id: number): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.get<any>(`${this.urlApiGetStateValvDevice}${id}`));
      return response;
    } catch (error) {
      console.error('Error al obtener el estado de la válvula del dispositivo:', error);
      return error;
    }
  }

  // Obtener mediciones del dispositivo
  async getDeviceData(id: number): Promise<any> {
    try {
      const response = await firstValueFrom(this.httpClient.get<any>(`${this.urlApiGetDeviceData}${id}`));
      return response;
    } catch (error) {
      console.error('Error al obtener las mediciones del dispositivo:', error);
      return error;
    }
  }

  // Guardar cambio de estado y medición del dispositivo
  async postChangeDeviceState(state: boolean, measurement: number, valve: number, device: number): Promise<any> {
    const dataToSend = {
      device: device,
      valve: valve,
      state: state,
      measure: measurement
    };
    try {
      const response = await firstValueFrom(this.httpClient.post<any>(`${this.urlApiPostChangeDeviceState}`,dataToSend));
      return response;
    } catch (error) {
      return error;
    }
  }


  constructor() { }
}
