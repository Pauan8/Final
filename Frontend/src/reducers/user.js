import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
      signed_in: false,
      avatar: null,
      name: null,
      surname: null,
      username: 'Lalaaa',
      password: 'ifeisfs',
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

export const fetchUser = () => {

}

export const addUser = () => {
  return (dispatch, getState) => {
    fetch('http://localhost:8080/users',
      { method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(getState().user.userInfo) })
      .then((res) => res.json())
  }
}

export default user