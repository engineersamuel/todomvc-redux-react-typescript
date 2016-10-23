import _ from 'lodash'
// import { handleActions, Action } from 'redux-actions';

import { Todo, IState } from './model';
import * as types       from './constants'

import {
    Action,
    Reducer,
    isType
} from './actionTypes'

const initialState: IState = [<Todo> {
  text: 'Use Redux with TypeScript',
  completed: false,
  id: 0
}];

let todo: Reducer<IState> = (state: IState = initialState, action: Action): IState => {
  if (isType(action, types.ACTION_ADD_TODO)) {
    return [{
      id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: action.completed,
      text: action.text
    }, ...state];
  }
  if (isType(action, types.ACTION_DELETE_TODO)) {
    return state.filter(todo =>
      todo.id !== action.todo.id
    );
  }
  if (isType(action, types.ACTION_EDIT_TODO)) {
    return <IState>state.map(todo =>
        todo.id === action.todo.id
            ? _.assign(<Todo>{}, todo, { text: action.text })
            : todo
    );
  }
  if (isType(action, types.ACTION_COMPLETE_TODO)) {
    return <IState>state.map(todo =>
        todo.id === action.todo.id ?
            _.assign({}, todo, { completed: !todo.completed }) :
            todo
    );
  }
  if (isType(action, types.ACTION_COMPLETE_ALL)) {
    const areAllMarked = state.every(todo => todo.completed);
    return <IState>state.map(todo => _.assign({}, todo, {
      completed: !areAllMarked
    }));
  }
  if (isType(action, types.ACTION_CLEAR_COMPLETED)) {
    return state.filter(todo => todo.completed === false);
  }
  return state;
};

export default todo;
