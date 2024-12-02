import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonIcon, IonCardContent, IonCard, IonLabel, IonToggle, IonFooter } from '@ionic/angular/standalone';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DeviceService } from 'src/app/services/device.service';
import { ToastController } from '@ionic/angular';
import { FormatDatePipe } from 'src/app/pipes/format-date-pipe.pipe';
import { HighlightHumidityDirective } from 'src/app/directives/highlight-humidity.directive';
import { addIcons } from 'ionicons';
import * as ionIcons from 'ionicons/icons';


@Component({
  selector: 'app-devices',
  templateUrl: './devices.page.html',
  styleUrls: ['./devices.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonButton, IonIcon, CommonModule, FormsModule,
    RouterLink, IonCardContent, IonCard, IonLabel, IonToggle, IonFooter, HighlightHumidityDirective, FormatDatePipe],
})


export class DevicesPage implements OnInit {

  // Inicializar variables
  dispositivoId: string | null = null;
  dispositivoNombre: string = '';
  dispositivoFecha: Date = new Date();
  dispositivoIdMedicion: number = 0;
  dispositivoValor: number = Math.floor(Math.random() * 100);
  dispositivoUbicacion: string = '';
  dispositivoElectroValvulaId: number = 0;
  dispositivoEstado: boolean = false;

  constructor(
    private deviceService: DeviceService,
    private actRoute: ActivatedRoute,
    private toastController: ToastController,
  ) {addIcons(ionIcons);}

  // Al cargar la pagina buscar el dispositivo
  ngOnInit() {
    this.searchDevice();
  }

  // Buscar el dispositivo
  async searchDevice() {
    this.actRoute.paramMap.subscribe(async params => {
      this.dispositivoId = params.get('id');
      if (this.dispositivoId) {
        this.deviceService.getDeviceInfo(Number(this.dispositivoId)).then((res) => {
          if (res) {
            // asignar valor a las variables
            const { item } = res;
            this.dispositivoId = item.dispositivoId;
            this.dispositivoNombre = item.nombre;
            this.dispositivoUbicacion = item.ubicacion;
            this.dispositivoFecha = new Date();
            this.dispositivoElectroValvulaId = item.electrovalvulaId;
          }
          this.searchValveState();
        }).catch(error => {
          console.error('Error al obtener los datos del dispositivo:', error);
        });
      }
    });
  }

  // Buscar el estado de la valvula
  async searchValveState() {
    this.actRoute.paramMap.subscribe(async params => {
      if (this.dispositivoElectroValvulaId) {
        this.deviceService.getStateValve(Number(this.dispositivoElectroValvulaId)).then((res) => {
          const { item } = res;
          // asignar el valor de la valvula de apertura
          if (item) {
            this.dispositivoEstado = item.apertura;
          } else {
            this.dispositivoEstado = false;
          }
        }).catch(error => {
          console.error('Error al obtener el estado de la válvula del dispositivo:', error);
        });
      }
    });
  }

  // Guardar cambio de estado (Insertar en Log_Riegos y en Mediciones)
  async onToggleChange() {
    const state = this.dispositivoEstado;
    const measure = this.dispositivoValor;
    const valve = this.dispositivoElectroValvulaId;
    const device = this.dispositivoId || 0;
    // Validar las variables
    if (measure >= 0 && measure <= 100) {
      if (state === false || state === true) {
        if (valve >= 0) {
          if (Number(device) >= 0) {
            try {
              // Ejecutar metodo para guardar la medicion y el registro de Log.
              await this.deviceService.postChangeDeviceState(state, measure, valve, Number(device));

              // Mostrar mensaje de ejecución correcta
              const toast = await this.toastController.create({
                message: 'Datos insertados correctamente',
                duration: 2000,
                position: 'top'
              });
              await toast.present();
              this.searchDevice();              
            } catch (error) {
              console.error('Error al cambiar el estado:', error);
            }
          }
        }
      }
    }
  }
}
