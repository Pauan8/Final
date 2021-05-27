import React from 'react'
import { Provider } from 'react-redux'
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import boardGames from './reducers/boardgame/boardGames';
import user from './reducers/user/user';
import Routing from 'routing/Routing'
import ui from 'reducers/ui';

const reducer = combineReducers({
  boardGames: boardGames.reducer,
  user: user.reducer,
  ui: ui.reducer
});

const store = configureStore({ reducer });
export const App = () => {
  return (
    <Provider store={store}>
      <Routing />
    </Provider>
  )
}
