import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/interfaces/device';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonGrid, IonRow, 
    IonCol, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonIcon] 
})

export class MainPage implements OnInit {
  
  // Inicializar la variable. Utilizar la interface
  devices: Device[] = []; 
  
  constructor(private deviceService: DeviceService) { 
    addIcons(ionIcons);
  }

  // Al cargar la pagina buscar los dispositivos
  ngOnInit() {
    this.searchDevices();
  }

  // Metodo para buscar los dispositivos
  async searchDevices() {
    try {
      const response = await this.deviceService.getDevices();
      this.devices = response; 
    } catch (error) {
      console.error('Error - ', error);
    }
  }
}
