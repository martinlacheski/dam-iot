import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Observable, Subscription, fromEvent, interval } from 'rxjs';
import { DispositivoService } from '../services/dispositivo.service';

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class DispositivoPage implements OnInit, OnDestroy {

  observable$: Observable<any>
  dispositivos: any = []
  // subscription: Subscription

  mouseMove$ = fromEvent(document, 'mousemove')

  constructor(private _dispositivoService: DispositivoService) {
    this.observable$ = interval(1000)

    // this.subscription = this.mouseMove$.subscribe((evt: any) => {
    //   console.log(`Coords: ${evt.clientX} X ${evt.clientY} Y`)
    // })
    // this.subscription = this.observable$.subscribe((value) => {
    //   console.log(value)
    // })
  }

  // subscribe () {
  //   this.subscription = this.observable$.subscribe((value) => {
  //     console.log(value)
  //   })
  // }

  // unsubscribe () {
  //   this.subscription.unsubscribe()
  // }

  ngOnInit () {
    this._dispositivoService.getDispositivos()
      .then((data) => {
        this.dispositivos = data
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(this.dispositivos)
  }

  ngOnDestroy () {
    // this.subscription.unsubscribe()
  }

}
