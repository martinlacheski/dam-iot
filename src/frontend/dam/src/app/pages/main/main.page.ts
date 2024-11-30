import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { Device } from 'src/app/interfaces/device';
import { searchOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonGrid, IonRow, IonCol, IonButton, IonIcon,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter]
})
export class MainPage implements OnInit {
  devices: Device[] = []; 

  constructor(private deviceService: DeviceService) { 
    addIcons({ searchOutline });
  }

  ngOnInit() {
    this.searchDevices();
  }

  // Al cargar la pagina buscar los dispositivos
  async searchDevices() {
    try {
      const response = await this.deviceService.getDevices();
      this.devices = response; 
    } catch (error) {
      console.error('Error - ', error);
    }
  }

  onCardClick(id: string) {
    console.log("dispositivo_id: " + id);
  }

}
