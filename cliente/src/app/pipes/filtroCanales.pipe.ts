import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
    transform(canalesRadio: any, search: any): any {

        if (search === undefined) return canalesRadio;
         return canalesRadio.filter(function(canalRadio){
                 return canalRadio.nombre.toLowerCase().includes(search.toLowerCase());
         })
     
    }
}