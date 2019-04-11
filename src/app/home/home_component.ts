import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { ITodoItem } from "../interface/todo";
import { TodoListState } from "../@Ngxrs/todolistState/state";

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

    trackByFn(index: number, item: ITodoItem) {
        return index; // or item.id
      }
}