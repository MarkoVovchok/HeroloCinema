import { Pipe, PipeTransform } from '@angular/core';
import { DEFAULT_IMAGE } from '../models';

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(value: string): string {
     if(value && (value!=='N/A')){
       return value;
     } else {
       return DEFAULT_IMAGE;
     }
  }

}
