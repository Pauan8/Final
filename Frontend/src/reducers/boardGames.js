import { createSlice } from "@reduxjs/toolkit";

import { fetches } from "./fetches/fetches";
import ui from './ui'
import user from './user'

const boardGames = createSlice({
  name: "boardGames",
  initialState: {
    gameLists: [
      {
      },
    ],
    searchList: [{}],
    game: [{}],
    history: [{}],
    filter: [],
  },
  error: "Error",
  reducers: {
    setGameLists: (store, action) => {
      const { sort, arr } = action.payload;
      const newarr = { ...store.gameLists, [sort]: arr };

      store.gameLists = newarr;
    },
    setGame: (store, action) => {
      const newGame = action.payload;
      store.game = newGame;
    },
    setFilter: (store, action) => {
      const updateArr = action.payload;
      store.filter = updateArr;
    },
  },
});

export const generateGamesList = (type, value) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
   fetches.games.list(type, value)
      .then((data) =>
      {
        dispatch(boardGames.actions.setGameLists({ arr: data.games, sort: value }))
        dispatch(ui.actions.setLoading(false))
      })
      .catch(error => console.log('catch error'))
  };
};

export const fetchSingleGame = (id) => {
  return (dispatch) => {
      dispatch(ui.actions.setLoading(true))
      fetches.games.game(id)
      .then((data) => 
      { 
        dispatch(boardGames.actions.setGame(data.games[0]))
        dispatch(ui.actions.setLoading(false))
      })
      .catch((error => console.log('catch error')))
  };
};

export default boardGames;
