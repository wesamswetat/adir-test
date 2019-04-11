import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem } from '../interface/todo';

@Pipe({
  name: 'myFilter'
})
export class MyFilterPipe implements PipeTransform {

  transform(value: ITodoItem[], args?: any): any {
    if (!args[0]) return value;
    if (args[0] === 'name') {
      return value.filter(event => event.name.includes(args[1]))
    }
    if (args[0] === 'id') {
      return value.filter(event => event.id.includes(args[1]))
    }
    if (args[0] == 'date') {
      if (!args[1]) return value;
      return value.filter(event => event.date.getTime() === args[1].getTime())
    }
    
  }

}
