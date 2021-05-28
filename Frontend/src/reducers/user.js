import { createSlice } from "@reduxjs/toolkit";

import { fetches } from './fetches/fetches'
import ui from './ui'

const RESET_STATE =  {
    userID: undefined,
    loggedOut: true,
    avatar: null,
    name: null,
    surname: null,
    username: null,
    e_mail: null,
  }

const user = createSlice({
  name: "user",
  initialState: { 
    accessToken: localStorage.getItem('token') === "undefined" ? null : localStorage.getItem('token'),
    userInfo: {
      userID: localStorage.getItem('userID'),
      avatar: null,
      name: null,
      surname: null,
      username: null,
      e_mail: null,
    },
    errors: {
      loggedOut: localStorage.getItem('token') === "undefined" || !localStorage.getItem('token') ? true : false,
    },
    lists: {
      favourites: [{}],
      wish: [{}],
      ownded: [{}],
    }
  },
  reducers: {
    setToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setUser: (store, action) => {
      store.userInfo = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setGameLists: (store, action) => {

    }
  },
});


export const signUp = ({ username, password, name, surname, e_mail }) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true))
    fetches.profile.signup(username, password, name, surname, e_mail)
      .then((data) => {
        dispatch(ui.actions.setLoading(false));
        if (data.sucess) {
          localStorage.setItem("userID", data.userID);
          localStorage.setItem("token", data.accessToken);
          dispatch(user.actions.setUser(data));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catch error')))
  };
};

export const fetchUser = (userID) => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))
    fetches.profile.user(userID, getState, dispatch)
      .then((data) => {
        dispatch(ui.actions.setLoading(false))
        if(data.success){
          dispatch(user.actions.setUser(data));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => {
        dispatch(user.actions.setErrors('catch error'))});
  };
};


export const login = (username, password) => {
  return (dispatch) => {
    fetches.profile.auth(username, password)
      .then((json) => {
        if (json.accessToken) {
          localStorage.setItem("token", json.accessToken);
          localStorage.setItem("userID", json.userID);
          dispatch(user.actions.setUser({ userID: json.userID }));
          dispatch(user.actions.setToken(json.accessToken));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(json))
        }
      })
      .catch((error) => dispatch(user.actions.setErrors("catch error")))
  };
};

export const addGameToList = (type, id) => {
  return (dispatch, getState) =>{
  fetches.games.game(id)
  .then(data => {
  fetches.profile.addGame(getState, data.id, type)})
  .then(games => dispatch(user.actions.setGameLists(games)))
  }
}

export const logout = () => {
  return (dispatch) => {
    localStorage.clear()
    dispatch(user.actions.setUser(RESET_STATE))
    dispatch(user.actions.setToken(null))
  }
}
export default user;
