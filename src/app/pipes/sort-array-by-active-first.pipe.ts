import { Pipe, PipeTransform } from '@angular/core';
import { ITodoItem } from '../interface/todo';

@Pipe({
  name: 'sortByActiveFirst'
})
export class SortByActiveFirst implements PipeTransform {

  transform(value: ITodoItem[], args?: any): any {
    const list: ITodoItem[] = [...value]
    const activeEvents = list.filter(event => event.status === 'active');
    const deactivateEvents = list.filter(event => event.status === 'deactivate');
    return [...activeEvents, ...deactivateEvents]
  }

}