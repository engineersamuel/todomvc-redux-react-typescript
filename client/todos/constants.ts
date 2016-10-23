import {ActionType} from "./actionTypes";
import * as interfaces from './interfaces'

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

// -----------------------------------
// Typescript action types
// -----------------------------------
export const ACTION_ADD_TODO: ActionType<interfaces.IAddTodo> = ADD_TODO;
export const ACTION_DELETE_TODO: ActionType<interfaces.IDeleteTodo> = DELETE_TODO;
export const ACTION_EDIT_TODO: ActionType<interfaces.IEditTodo> = EDIT_TODO;
export const ACTION_COMPLETE_TODO: ActionType<interfaces.ICompleteTodo> = COMPLETE_TODO;
export const ACTION_COMPLETE_ALL: ActionType<interfaces.ICompleteAll> = COMPLETE_ALL;
export const ACTION_CLEAR_COMPLETED: ActionType<interfaces.IClearCompleted> = CLEAR_COMPLETED;
