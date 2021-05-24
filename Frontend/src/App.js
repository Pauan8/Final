import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import boardGames from './reducers/boardGames';
import user from './reducers/user';
import Routing from 'routing/Routing'

const reducer = combineReducers({
  boardGames: boardGames.reducer,
  user: user.reducer
});

const store = configureStore({ reducer });
export const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}
