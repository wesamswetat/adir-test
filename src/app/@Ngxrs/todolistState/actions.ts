import { ITodoItem } from "src/app/interface/todo";

export class AddNewTodo {
    static readonly type = '[TODO] ADD NEW';

    constructor(public item: ITodoItem) {}
}

export class DeleteTodo {
    static readonly type = '[TODO] DELETE';

    constructor(public todoID: String) {}
}

export class EditTodo {
    static readonly type = '[TODO] EDIT';

    constructor(public item: ITodoItem) {}
}

export class DuplicateTodo {
    static readonly type = '[TODO] DUPLICATE';

    constructor(public item: ITodoItem) {}
}

export class DeactivateTodo {
    static readonly type = '[TODO] DEACTIVATE';

    constructor(public todoID: String) {}
}

export class ActiveTodo {
    static readonly type = '[TODO] ACTIVE';

    constructor(public todoID: String) {}
}

