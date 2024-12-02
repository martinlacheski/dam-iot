import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDatePipe',
  standalone: true
})

// Tuberia para cambiar el formato de fecha
export class FormatDatePipe implements PipeTransform {

  // Transformar el formato
  transform(fecha: any): string {
    const dateObject = new Date(fecha);
    const dia = dateObject.getDate().toString().padStart(2, '0');
    const mes = (dateObject.getMonth() + 1).toString().padStart(2, '0'); // Meses van de 0 a 11
    const anio = dateObject.getFullYear();
    const horas = dateObject.getHours().toString().padStart(2, '0');
    const minutos = dateObject.getMinutes().toString().padStart(2,'0');
    const segundos = dateObject.getSeconds().toString().padStart(2, '0');

    // Retornar la fecha con el formato siguiente
    return `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;
  }
}
