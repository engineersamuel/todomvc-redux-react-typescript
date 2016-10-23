import {Action}     from './actionTypes'
import {Todo} from "./model";

export interface IAddTodo extends Action { text: string, completed: boolean }
export interface IEditTodo extends Action { todo: Todo, text: string}
export interface IDeleteTodo extends Action { todo: Todo }
export interface ICompleteTodo extends Action { todo: Todo }
export interface ICompleteAll extends Action { }
export interface IClearCompleted extends Action { }

