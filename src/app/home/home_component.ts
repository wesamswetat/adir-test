import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { ITodoItem } from "../interface/todo";
import { TodoListState } from "../@Ngxrs/todolistState/state";
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DragAndDropChanges } from "../@Ngxrs/todolistState/actions";

@Component({
    selector: 'todo-home',
    templateUrl: './home_component.html',
    styleUrls: ['./home_component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
    @Select(TodoListState.getTodoList) todoList$: Observable<ITodoItem[]>;
    filterBy: string;
    filterByNameOrId: string = '';

    constructor(private store: Store) {}

    trackByFn(index: number, item: ITodoItem) {
        return index; // or item.id
      }

      drop(event: CdkDragDrop<ITodoItem[]>, list: ITodoItem[]) {
        const newArray = [...list]
        if (event.previousIndex === event.currentIndex) return;
        moveItemInArray(newArray, event.previousIndex, event.currentIndex);
        this.store.dispatch(new DragAndDropChanges(newArray))
      }
}