import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    signup: {
      success: false
    },
    login: {
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
    },
    setLoggedIn: (store, action) => {
      const isLoggedIn = action.payload;
      store.login.success = isLoggedIn;
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
      .then((data) => {(console.log(data.userID))
        localStorage.setItem('userID', data.userID)
        localStorage.setItem('token', data.acessToken)
        dispatch(user.actions.setUser(data))
        dispatch(user.actions.setSignUp(true))})
      .catch(error => dispatch(user.actions.setSignUp(false)))
  }
}

export const fetchUser = () => {
  return (dispatch) => {
  fetch(`https://secure-escarpment-13722.herokuapp.com/profile/${localStorage.getItem('userID')}`,
  {
  headers: {
    'content-type': 'application/json',
    'Authorization' : localStorage.getItem('token'),
  }})
  .then(res => res.json())
  .then(data => dispatch(user.actions.setUser(data)))
}}

export const status = () => {
  return (dispatch) => {
    fetch('https://secure-escarpment-13722.herokuapp.com/status',
  {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': localStorage.getItem('token'),
    }, 
    body: JSON.stringify({
      userID: localStorage.getItem('userID')
    })  
  })
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(error => console.log('error'))
}}


export const auth = (username, password) => {
  return fetch('https://secure-escarpment-13722.herokuapp.com/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'Authorization' : localStorage.getItem('token'),
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
        if (json.accessToken) {
          localStorage.setItem('token', json.accessToken)
          localStorage.setItem('userID', json.userID)
          dispatch(user.actions.setLoggedIn(true))
        } else {
          console.log('error')
        }
      }).catch(error => console.log(error))
  }
}
export default user