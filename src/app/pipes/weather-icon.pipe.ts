import { Pipe, PipeTransform } from '@angular/core';


/**
 * @description Get icon  if bigger 10 that add 0
 * @returns icon with value 0
 */

export const IMG_URL = `https://developer.accuweather.com/sites/default/files`;
@Pipe({
  name: 'accuweatherIcon'
})
export class WeatherIconPipe implements PipeTransform {


  transform(value: any): any {
    if (value < 10) {
      value = `0${value}`;
    }
    return `${IMG_URL}/${value}-s.png`;
  }
}