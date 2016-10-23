import * as interfaces from './interfaces'
import * as types from './constants'
import {Todo}       from './model';


function addTodo(text: string, completed: boolean): interfaces.IAddTodo {
    return { type: types.ADD_TODO, text: text, completed: completed };
}

function deleteTodo(todo: Todo): interfaces.IDeleteTodo {
    return { type: types.DELETE_TODO, todo: todo };
}

function editTodo(todo: Todo, text: string): interfaces.IEditTodo {
    return { type: types.EDIT_TODO, todo: todo, text: text };
}

function completeTodo(todo: Todo): interfaces.ICompleteTodo {
    return { type: types.COMPLETE_TODO, todo };
}

function completeAll(): interfaces.ICompleteAll {
    return { type: types.COMPLETE_ALL };
}

function clearCompleted(): interfaces.IClearCompleted {
    return { type: types.CLEAR_COMPLETED };
}

export {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    completeAll,
    clearCompleted
}
