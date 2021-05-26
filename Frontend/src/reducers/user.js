import { createSlice } from "@reduxjs/toolkit";
const RESET_STATE =  {
  accessToken: undefined,
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
    userInfo: {
      accessToken: localStorage.getItem('token') === "undefined" ? undefined : localStorage.getItem('token'),
      loggedOut: localStorage.getItem('token') === "undefined" ? true : false,
      userID: null,
      avatar: null,
      name: null,
      surname: null,
      username: null,
      e_mail: null,
    },
    errors: {

    },
    lists: {
      favourites: [{}],
      wish: [{}],
      ownded: [{}],
    }
  },
  reducers: {
    setToken: (store, action) => {
      store.userInfo.accessToken = action.payload;
    },
    setUser: (store, action) => {
      store.userInfo = action.payload;
    },
    setErrors: (store, action) => {
      store.errors = action.payload;
    },
    setUserInfo: (store, action) => {
      const { name, surname } = action.payload;
      const updatedInfo = { ...store.userInfo, name, surname};
      store.userInfo = updatedInfo;
    },
    setLoggedOut: (store, action) => {
      const isLoggedOut = action.payload;
      store.userInfo.loggedOut = isLoggedOut;
    },
  },
});


export const signUp = ({ username, password, name, surname, e_mail }) => {
  return (dispatch, getState) => {
    fetch("https://secure-escarpment-13722.herokuapp.com/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        name,
        surname,
        e_mail
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.sucess) {
          localStorage.setItem("token", data.accessToken);
          dispatch(user.actions.setUser(data));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => dispatch(user.actions.setErrors('catcherror')))
  };
};

export const fetchUser = () => {
  return (dispatch, getState) => {
    fetch(
      `https://secure-escarpment-13722.herokuapp.com/profile/${getState().user.userInfo.userID}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: getState().user.userInfo.accessToken
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if(data.success){
          dispatch(user.actions.setUser(data));
        } else {
          dispatch(user.actions.setErrors(data));
        }
      })
      .catch((error) => {
        dispatch(user.actions.setErrors('catcherror'))});
  };
};

export const auth = (username, password) => {
  return fetch("https://secure-escarpment-13722.herokuapp.com/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());
};

export const login = (username, password) => {
  return (dispatch) => {
    auth(username, password)
      .then((json) => {
        if (json.accessToken) {
          localStorage.setItem("token", json.accessToken);
          dispatch(user.actions.setUser(json));
        } else {
          dispatch(user.actions.setErrors(json))
        }
      })
      .catch((error) => dispatch(user.actions.setErrors(error)))
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    localStorage.clear()
    dispatch(user.actions.setUser(RESET_STATE.map(item => item)))
  }
}
export default user;
