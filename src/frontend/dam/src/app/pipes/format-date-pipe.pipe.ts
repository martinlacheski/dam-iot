import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatePipe',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(fecha: any): string {
    const dateObject = new Date(fecha);
    // Formato original: 2020-08-24T18:12:46.000Z
    // Formato nuevo:    24/08/2020 18:12:46.000Z
    // return fecha.substr(8,2) + '/' + fecha.substr(5,2) +  '/' + fecha.substr(0,4) + ' ' + fecha.substr(11);
    const dia = dateObject.getDate().toString().padStart(2, '0');
    const mes = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const anio = dateObject.getFullYear();
    const horas = dateObject.getHours().toString().padStart(2, '0');
    const minutos = dateObject.getMinutes().toString().padStart(2,
      '0');
    const segundos = dateObject.getSeconds().toString().padStart(2, '0');
    const milisegundos = dateObject.getMilliseconds().toString().padStart(3, '0');
    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}.${milisegundos}`;
  }
}
