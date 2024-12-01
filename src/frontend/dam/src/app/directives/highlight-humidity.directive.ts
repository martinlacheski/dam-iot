import { Directive, ElementRef, Renderer2, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[humidityDirective]',
  standalone: true
})
export class HighlightHumidityDirective implements OnInit {

  @Input() valor!: string;
  constructor(private referencia: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    console.log(this.valor)
     this.renderer.setStyle(this.referencia.nativeElement, 'backgroundColor', this.getColor(Number(this.valor)));  
  }

  getColor(value: number): string {
    if (value <= 60) {
      return 'lightblue'; // Humedad baja
    } else if (value > 60 && value <= 80) {
      return 'lightgreen'; // Humedad Normal
    } else if (value > 81) {
      return 'lightcoral'; // Humedad Alta
    } else {
      return 'white'; // Color por defecto
    }
  }
}

