import { createSlice } from "@reduxjs/toolkit";

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
  return (dispatch, getState) => {
    fetch(
      `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&${type}=${value}`
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) =>
        dispatch(
          boardGames.actions.setGameLists({ arr: data.games, sort: value })
        )
      );
  };
};

export const fetchSingleGame = (id) => {
  return (dispatch) => {
    fetch(
      `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&ids=${id}`
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(boardGames.actions.setGame(data.games[0])));
  };
};

export default boardGames;
