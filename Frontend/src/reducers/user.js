import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    userInfo: {
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
    }
  }
});

export default user