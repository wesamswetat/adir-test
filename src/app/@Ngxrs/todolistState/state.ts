import { State, Selector, Action, StateContext } from "@ngxs/store";
import { ITodoItem } from "src/app/interface/todo";
import { AddNewTodo, DeleteTodo, EditTodo, DuplicateTodo, DeactivateTodo, ActiveTodo } from "./actions";
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
            list: [...state.list, item]
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
        const eventEndexToEdit: number = state.list.findIndex(state => state.id === item.id);
        state.list[eventEndexToEdit] = item;
        patchState({
            list: [...state.list]
        });
    }

    @Action(DuplicateTodo)
    DuplicateTodo({ getState, patchState }: StateContext<ITodoState>, {item}:DuplicateTodo) {
        const state = getState();
        patchState({
            list: [...state.list, item]
        })
    }

    @Action(DeactivateTodo)
    DeactivateTodo({ getState, patchState }: StateContext<ITodoState>, {todoID}: DeactivateTodo) {
        const state = getState();
        const eventIndex: number = state.list.findIndex(event => event.id === todoID);
        state.list[eventIndex].status = 'deactivate';
        const activeEvents = state.list.filter(event => event.status === 'active');
        const deactivateEvents = state.list.filter(event => event.status === 'deactivate');
        patchState({
            list: [...activeEvents, ...deactivateEvents]
        })
    }

    @Action(ActiveTodo)
    ActiveTodo({ getState, patchState }: StateContext<ITodoState>, {todoID}: ActiveTodo) {
        const state = getState();
        const eventIndex: number = state.list.findIndex(event => event.id === todoID);
        state.list[eventIndex].status = 'active';
        const activeEvents = state.list.filter(event => event.status === 'active');
        const deactivateEvents = state.list.filter(event => event.status === 'deactivate');
        patchState({
            list: [...activeEvents, ...deactivateEvents]
        })
    }

}