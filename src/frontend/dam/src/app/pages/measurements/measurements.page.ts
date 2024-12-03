import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonCard, IonIcon, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter } from '@ionic/angular/standalone';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { Measurement } from 'src/app/interfaces/measurement';
import { Device } from 'src/app/interfaces/device';
import { HighlightHumidityDirective } from 'src/app/directives/highlight-humidity.directive';
import { FormatDatePipe } from 'src/app/pipes/format-date-pipe.pipe';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';

@Component({
  selector: 'app-measurements',
  templateUrl: './measurements.page.html',
  styleUrls: ['./measurements.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonGrid, IonRow, IonCol, IonButtons, IonButton, 
    IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, HighlightHumidityDirective, FormatDatePipe]
})

export class MeasurementsPage implements OnInit {

  // Inicializar variables
  dispositivoId: string | null = null;
  // Utilizar las interfaces
  device: Device | null = null;
  measurements: Measurement[] = [];

  constructor(
    private deviceService: DeviceService,
    private actRoute: ActivatedRoute,
  ) {addIcons(ionIcons);}

  // Al cargar la pagina buscar las medidiciones del dispositivo
  ngOnInit() {
    this.searchDeviceData();
  }

  // Al cargar la pagina buscar las mediciones del dispositivo
  async searchDeviceData() {
    this.actRoute.paramMap.subscribe(async params => {
      this.dispositivoId = params.get('id');
      if (this.dispositivoId) {
        this.deviceService.getDeviceData(Number(this.dispositivoId)).then((res) => {
          if (res) {
            // asignar valor a las variables
            this.device = res.dispositivo;
            this.measurements = res.mediciones;
          }
        }).catch(error => {
          console.error('Error al obtener los datos del dispositivo:', error);
        });
      }
    });
  }

}
