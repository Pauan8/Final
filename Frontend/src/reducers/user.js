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
      userInfo:  {
        userID: localStorage.getItem('userID'),
        avatar: null,
        name: null,
        surname: null,
        username: null,
        e_mail: null,
        age: null,
        description:null,
        lists: null
    },

  },
    errors: {
      loggedOut: localStorage.getItem('token') === "undefined" || !localStorage.getItem('token') ? true : false,
  },
  reducers: {
    setToken: (store, action) => {
      store.accessToken = action.payload;
    },
    setUser: (store, action) => {
      const userInfo = action.payload;
      store.userInfo = userInfo
    },
    updateUser: (store, action) => {
      const userInfo = action.payload
      store.userInfo = userInfo;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setGameLists: (store, action) => {
      store.userInfo.lists = action.payload;
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

export const fetchUser = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))
    fetches.profile.user(getState, dispatch)
      .then((data) => {
        dispatch(ui.actions.setLoading(false))
        if(data.success){
          dispatch(user.actions.setUser(data));
          dispatch(user.actions.setGameLists(data.lists))
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

export const editProfile = (avatar, name, surname, e_mail, description, age) =>  {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true))
    fetches.profile.edit(avatar, name, surname, e_mail, description, age, getState)
    .then((data) => {
      dispatch(ui.actions.setLoading(false));
      if (data.success) {
        dispatch(user.actions.updateUser(data));
        dispatch(user.actions.setErrors(null));
      } else {
        dispatch(user.actions.setErrors(data))
      }
    })
    .catch((error) => dispatch(user.actions.setErrors("catch error")))
  }
}

export const addRemoveGame = (type, id, method) => {
  return (dispatch, getState) =>{
  fetches.games.game(id)
  .then(data => {
  method === 'add' 
  ? fetches.profile.addGame(getState, data.games[0], type) 
  : fetches.profile.removeGame(getState, data.games[0], type)}) 
  .then(games => {
    if(games.success) {
 
    dispatch(user.actions.setGameLists(games.lists))
    dispatch(user.actions.setErrors(null))
  } else {
    dispatch(user.actions.setErrors(games))
  }
}) 
.catch((error) => dispatch(user.actions.setErrors("catch error")))
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
