import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    signup: {
      success: false
    },
    userInfo: {
      avatar: null,
      name: null,
      surname: null,
      username: null,
      e_mail: null,
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
    },
    setSignUp: (store, action) => {
      const isSucess = action.payload;
      store.signup.success = isSucess;
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

export const signUp = ({username, password, name, surname, e_mail}) => {
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
          surname,
          e_mail
        }) 
      })
      .then((res) => res.json())
      .then((data) => (dispatch(user.actions.setSignUp(true))))
      .catch(error => dispatch(user.actions.setSignUp(false)))
  }
}

export const fetchUser = (username) => {
  
}

export const auth = (username, password) => {
  return fetch('https://secure-escarpment-13722.herokuapp.com/auth/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        },
        body: JSON.stringify({
          username,
          password,
        })  
      })
    .then((res) => res.json())
  }


export const login = (username, password) => {
  return (dispatch) => {
      auth(username, password)
      .then((json) => {
        console.log( json)
        if (json.Authorization) {
          localStorage.setItem('token', json.Authorization)
          dispatch(user.actions.setUser(json))
        } else {
          console.log('error')
        }
      }).catch(error => console.log(error))
  }
}
export default user