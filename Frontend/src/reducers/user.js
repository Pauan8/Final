import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      avatar: null,
      name: null,
      surname: null,
      username: null,
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
      store.userInfo = currentUser;
    },
    setUserInfo: (store, action) => {
      const { name, surname } = action.payload;
      const updatedInfo = { ...store.userInfo, name, surname }
      store.userInfo = updatedInfo;
    }
  }
});

export const fetchProfile = () => {
  return (dispatch, getState) => {
    fetch(`https://secure-escarpment-13722.herokuapp.com/profile/${getState().user.userInfo.username}`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json()
      })
      .then((profile) => (profile.length > 0 ? dispatch(user.actions.setUserInfo(profile)) : console.log('nada')))
  }
}

export const signUp = (username, password, name, surname) => {
  return (dispatch, getState) => {
    fetch('https://secure-escarpment-13722.herokuapp.com/users',
      { method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          name,
          surname
        }) 
      })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch(error => console.log(error))
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
      })
    .then((res) => res.json())
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
          console.log('error')
        }
      })
  }
}
export default user