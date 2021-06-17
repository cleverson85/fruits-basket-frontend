import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'configureImage'
})
export class ConfigureImagePipe implements PipeTransform {
  file: File;

  transform(value: any, args?: any): any {

    if (value) {
      value = `data:image/jpeg;base64,${value}`;
    }

    return value;
  }
}
