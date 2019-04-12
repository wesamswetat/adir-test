import { State, Selector, Action, StateContext } from "@ngxs/store";
import { ITodoItem } from "src/app/interface/todo";
import { AddNewTodo, DeleteTodo, EditTodo, DuplicateTodo, DeactivateTodo, ActiveTodo, DragAndDropChanges } from "./actions";
import { ITodoState } from "src/app/interface/todoState";

@State<ITodoState>({
    name: 'todoList',
    defaults: {
        list: []
    }
})
export class TodoListState {
    @Selector()
    static getTodoList(state: ITodoState): ITodoState {
        return state;
    }

    @Action(AddNewTodo)
    AddNewTodo({ getState, patchState }: StateContext<ITodoState>, {item}: AddNewTodo) {
        const state = getState();

        patchState({
            list: [item, ...state.list]
        })
    }

    @Action(DeleteTodo)
    DeleteTodo({ getState, patchState }: StateContext<ITodoState>, {todoID}: DeleteTodo) {
        const state = getState();
        patchState({
            list: state.list.filter(state => state.id !== todoID)
        });
    }

    @Action(EditTodo)
    EditTodo({ getState, patchState }: StateContext<ITodoState>, {item}: EditTodo) {
        const state = getState();
        console.log(item)
        const eventEndexToEdit: number = state.list.findIndex(state => state.id === item.id);
        state.list[eventEndexToEdit] = item;
        patchState({
            list: [...state.list]
        });
    }

    @Action(DuplicateTodo)
    DuplicateTodo({ getState, patchState }: StateContext<ITodoState>, {item}:DuplicateTodo) {
        const state = getState();
        if (item.duplicateaTimes) {
            item.duplicateaTimes = item.duplicateaTimes + 1;
        } else {
            item.duplicateaTimes = 1;
        }
        const newItem: ITodoItem = {
            date: item.date,
            name: item.name,
            id: `${item.id}-D${item.duplicateaTimes}`,
            status: item.status
        }
        patchState({
            list: [...state.list, newItem]
        })
    }

    @Action(DeactivateTodo)
    DeactivateTodo({ getState, patchState }: StateContext<ITodoState>, {todoID}: DeactivateTodo) {
        const state = getState();
        const eventIndex: number = state.list.findIndex(event => event.id === todoID);
        state.list[eventIndex].status = 'deactivate';
        patchState({
            list: [...state.list]
        })
    }

    @Action(ActiveTodo)
    ActiveTodo({ getState, patchState }: StateContext<ITodoState>, {todoID}: ActiveTodo) {
        const state = getState();
        const eventIndex: number = state.list.findIndex(event => event.id === todoID);
        state.list[eventIndex].status = 'active';
        patchState({
            list: [...state.list]
        })
    }

    @Action(DragAndDropChanges)
    DragAndDropChanges({ patchState }: StateContext<ITodoState>, {list}: DragAndDropChanges) {
        patchState({
            list: [...list]
        })
    }

}