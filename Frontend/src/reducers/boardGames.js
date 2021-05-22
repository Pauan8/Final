import { createSlice } from '@reduxjs/toolkit';

const boardGames = createSlice({
  name: 'boardGames',
  initialState: {
    gameLists: [{
      active: true,
      artists: null,
      availability_status: null,
      average_learning_complexity: null,
      average_strategy_complexity: null,
      average_user_rating: null,
      categories: null,
      comment_count: null,
      commentary: null,
      description: null,
      description_preview: null,
      designers: null,
      developers: null,
      discount: null,
      faq: null,
      handle: null,
      historical_low_prices: null,
      id: null,
      image_url: null,
      images: null,
      is_historical_low: null,
      isbn: null,
      links: null,
      listing_clicks: null,
      lists: null,
      matches_specs: null,
      max_players: null,
      max_playtime: null,
      mechanics: null,
      mentions: null,
      min_age: null,
      min_players: null,
      min_playtime: null,
      msrp: null,
      msrp_text: null,
      msrps: null,
      name: null,
      names: null,
      num_distributors: null,
      num_user_complexity_votes: null,
      num_user_ratings: null,
      official_url: null,
      plays: null,
      price: null,
      price_au: null,
      price_ca: null,
      price_text: null,
      price_uk: null,
      primary_designer: null,
      primary_publisher: null,
      publishers: null,
      rank: null,
      related_to: null,
      rules_url: null,
      sell_sheet_url: null,
      sku: null,
      specs: null,
      store_images_url: null,
      tags: null,
      thumb_url: null,
      trending_rank: null,
      type: null,
      upc: null,
      url: null,
      visits: null,
      year_published: null
    }],
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
        page: null
      }
    ]
  },
  error: 'Error',
  reducers: {
    setGameLists: (store, action) => {
      const { sort, arr } = action.payload;
      const newarr = { ...store.gameLists, [sort]: arr }
      console.log(arr.map((item) => {
        Object.keys(item).map((key) => item[key])
        return { ...item }
      }))

      store.gameLists = newarr
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
        release_year
      } = action.payload;
    }
  }
});

export const generateGamesList = (type, value) => {
  return (dispatch, getState) => {
    fetch(`https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&${type}=${value}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(boardGames.actions.setGameLists({ arr: data.games, sort: value })))
  }
}

export const fetchSingleGame = (id) => {
  return (dispatch) => {
    fetch(`https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&ids=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => dispatch(boardGames.actions.setGame(data.games[0])))
  }
}

export default boardGames