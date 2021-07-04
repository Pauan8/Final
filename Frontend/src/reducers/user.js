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
    stat: null,
    state: null,
    messages: null,
    avatar: null
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
        state: null, 
      },
      activeFriend: [],
    }
  },
  errors: {
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
    setMessages: (store, action) => {
      const { username, messages} = action.payload;
      const friends =  store.userInfo.friends.map( friend => {
        if(friend.username === username) {
          return {...friend, messages: messages}
        } else {
          return friend;
        }})
      store.userInfo.friends = friends;
    },
    setActiveFriend: (store, action) => {
      const active = action.payload;
      store.userInfo.activeFriend = active;
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
          dispatch(user.actions.setErrors(null));
          dispatch(user.actions.setUser(data.user));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => user.actions.setErrors("catch"));
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
          dispatch(user.actions.setErrors(null));
          dispatch(user.actions.setUser(json));
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

export const handleFriend = (friend_id, state) => {
  return (dispatch) => {
    state === 'add'
    ? fetches.profile.addFriend(friend_id)
    : fetches.profile.removeFriend(friend_id)
    .then((data) => {
      if(data.success){
        dispatch(user.actions.setFriends(data.friends))
        dispatch(user.actions.setErrors(null));
      } else {
        dispatch(user.actions.setErrors(data));
      }
    })
    .catch((error) => dispatch(user.actions.setErrors('catch error')));
  }
};

export const answerFriendRequest = (friend_id, status) => {
  return (dispatch) => {
    fetches.profile
    .answerFriendRequest(friend_id, status)
    .then((data) => {
      if(data.success){
        dispatch(user.actions.setFriends(data.friends))
        dispatch(user.actions.setErrors(null));
      } else {
        dispatch(user.actions.setErrors(data));
      }
    })
    .catch((error) => dispatch(user.actions.setErrors('catch error')));
  }
};

export const fetchMessages = (username) => {
  return (dispatch) => {
    fetches.profile
    .getMessages(username)
    .then((data) => {
      if(data.success){
        dispatch(user.actions.setMessages({username: username, messages: data.messages}))
        dispatch(user.actions.setErrors(null));
      } else {
        dispatch(user.actions.setErrors(data));
      }
    })
    .catch((error) => dispatch(user.actions.setErrors('catch error')));
  }
};

export const sendMessage = (username, message) => {
  return (dispatch) => {
    fetches.profile
    .sendMessage(username, message)
    .then((data) => {
      if(data.success){
        dispatch(user.actions.setFriends(data.friends))
        dispatch(user.actions.setErrors(null));
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
  };
};
export default user;



