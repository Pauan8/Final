import { createSlice } from '@reduxjs/toolkit';

import { fetches } from './fetches/fetches';
import ui from './ui';

const RESET_STATE = {
  userID: null,
  avatar: null,
  name: null,
  surname: null,
  username: null,
  e_mail: null,
  age: null,
  description: null,
  lists: null,
  friends: {
    username: null,
    status: null,
    state: null
  }
};

const user = createSlice({
  name: 'user',
  initialState: {
  userInfo: {
      userID: null,
      avatar: null,
      name: null,
      surname: null,
      username: null,
      e_mail: null,
      age: null,
      description: null,
      lists: null,
      friends: {
        username: null,
        status: null,
        state: null
      }
    },
  },
  errors: {
    loggedOut: !localStorage.getItem('token')
        ? true
        : false,
  },
  reducers: {
    setUser: (store, action) => {
      const userInfo= action.payload;
      store.userInfo = userInfo;
    },
    updateUser: (store, action) => {
      const userInfo = action.payload;
      store.userInfo = userInfo;
    },
    setFriends: (store, action) => {
      const friends = action.payload;
      store.userInfo.friends = friends;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setGameLists: (store, action) => {
      store.userInfo.lists = action.payload;
    },
  },
});

export const signUp = ({ username, password, name, surname, e_mail }) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetches.profile
      .signup(username, password, name, surname, e_mail)
      .then((data) => {
        dispatch(ui.actions.setLoading(false));
        if (data.success) {
          localStorage.setItem('userID', data.userID);
          localStorage.setItem('token', data.accessToken);
          dispatch(user.actions.setUser(data));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catch error')));
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetches.profile
      .user(dispatch)
      .then((data) => {
        dispatch(ui.actions.setLoading(false));
        if (data.success) {
          dispatch(user.actions.setUser(data));
          dispatch(user.actions.setGameLists(data.lists));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => {
        dispatch(user.actions.setErrors('catch error'));
      });
  };
};

export const login = (username, password) => {
  return (dispatch) => {
    fetches.profile
      .auth(username, password)
      .then((json) => {
        if (json.accessToken) {
          localStorage.setItem('token', json.accessToken);
          localStorage.setItem('userID', json.userID);
          dispatch(user.actions.setUser(json));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(json));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catch error')));
  };
};

export const editProfile = (
  avatar,
  name,
  surname,
  e_mail,
  description,
  age
) => {
  return (dispatch) => {
    dispatch(ui.actions.setLoading(true));
    fetches.profile
      .edit(avatar, name, surname, e_mail, description, age)
      .then((data) => {
        dispatch(ui.actions.setLoading(false));
        if (data.success) {
          dispatch(user.actions.updateUser(data));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catch error')));
  };
};

export const addFriend = (username) => {
  return (dispatch) => {
    fetches.profile
    .addFriend(username)
    .then((data) => {
      if(data.success){
        dispatch(user.actions.setFriends(data.friends))
      } else {
        dispatch(user.actions.setErrors(data));
      }
    })
    .catch((error) => dispatch(user.actions.setErrors('catch error')));
  }
};

export const answerFriendRequest = (userId, status) => {
  return (dispatch) => {
    fetches.profile
    .answerFriendRequest( userId, status)
    .then((data) => {
      if(data.success){
        dispatch(user.actions.setFriends(data.friends))
      } else {
        dispatch(user.actions.setErrors(data));
      }
    })
    .catch((error) => dispatch(user.actions.setErrors('catch error')));
  }
};

export const addGame = (type, id) => {
  return (dispatch) => {
    fetches.games
      .game(id)
      .then((data) => {
        fetches.profile.addGame(data.games[0], type);
      })
      .then((games) => {
        if (games.success) {
          dispatch(user.actions.setGameLists(games.lists));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(games));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catch error')));
  };
};

export const removeGame = (type, id) => {
  return (dispatch) => {
    fetches.profile
      .removeGame(id, type)
      .then((games) => {
        if (games.success) {
          dispatch(user.actions.setGameLists(games.lists));
          dispatch(user.actions.setErrors(null));
        } else {
          dispatch(user.actions.setErrors(games));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catch error')));
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(user.actions.setUser(RESET_STATE));
    dispatch(user.actions.setToken(null));
  };
};
export default user;



