import { combineReducers } from '@reduxjs/toolkit';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { todosReducer } from './todos';


const rootReducer = combineReducers({
    todos: todosReducer,
});

export const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(thunk),
    ),
);