import { createSlice } from '@reduxjs/toolkit';

import boardGames from '../reducers/boardGames'

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      signed_in: false,
      avatar: null,
      name: null,
      surname: null,
      username: null,
      password: null,
      e_mail: null
    },
    lists: {
      favourites: [{}],
      wish: [{}],
      ownded: [{}]
    }
  },
  reducers: {
    setUser: (store, action) => {
      const currentUser = action.payload;
      store.user = currentUser;
    },
    setLoggedIn: (store, action) => {
      const { username, password } = action.payload;
    }
  }
});

export const fetchProfile = () => {
    return (dispatch, getState) => {
        fetch()
    }
}

export const addUser = (username, password) => {
  return (dispatch, getState) => {
    fetch('https://secure-escarpment-13722.herokuapp.com/users',
      { method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify( username, password) })
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
}

export const auth = (username, password) => {
  return (dispatch) => {
    fetch('https://secure-escarpment-13722.herokuapp.com/auth/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          token: localStorage.getItem('token')
        },
        body: JSON.stringify({
          username,
          password
        })
          .then((res) => res.json())
      })
  }
}

export const login = (username, password) => {
  return (dispatch) => {
    dispatch(auth(username, password))
      .then((json) => {
        if (json.token) {
          localStorage.setItem('token', json.token)
          dispatch(user.actions.setUser(json))
        } else {
          console.log("error")
        }
      })
  }
}
export default user