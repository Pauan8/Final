import { createSlice } from "@reduxjs/toolkit";

import { fetches } from "./fetches";
import ui from '../ui'

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
    filter: [
      {
        categories: null,
        mechanics: null,
        name: null,
        max_players: null,
        min_players: null,
        min_playtime: null,
        max_playtime: null,
        min_age: null,
        publisher: null,
        gt_release_year: null,
        lt_release_year: null,
        release_year: null,
        page: null,
      },
    ],
  },
  error: "Error",
  reducers: {
    setGameLists: (store, action) => {
      const { sort, arr } = action.payload;
      const newarr = { ...store.gameLists, [sort]: arr };
      console.log(
        arr.map((item) => {
          Object.keys(item).map((key) => item[key]);
          return { ...item };
        })
      );

      store.gameLists = newarr;
    },
    setGame: (store, action) => {
      const newGame = action.payload;
      store.game = newGame;
    },
    setFilter: (store, action) => {
      const {
        categories,
        mechanics,
        name,
        max_players,
        min_players,
        min_playtime,
        max_playtime,
        min_age,
        publisher,
        gt_release_year,
        lt_release_year,
        release_year,
      } = action.payload;
    },
  },
});

export const generateGamesList = (type, value) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
   fetches.list(type, value)
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
      fetches.game(id)
      .then((data) => 
      { 
        dispatch(boardGames.actions.setGame(data.games[0]))
        dispatch(ui.actions.setLoading(false))
      })
      .catch((error => console.log('catch error')))
  };
};

export default boardGames;
