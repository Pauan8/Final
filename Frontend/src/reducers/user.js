import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem('token'),
    userInfo: {
      loggedOut: true,
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
    },
  },
  reducers: {
    setToken: (store, action) => {
      store.token = action.payload;
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
        e_mail,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.userID);
        localStorage.setItem("userID", data.userID);
        localStorage.setItem("token", data.accessToken);
        dispatch(user.actions.setUser(data));
      })
      .catch((error) => dispatch(user.actions.setSignUp(false)));
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    fetch(
      `https://secure-escarpment-13722.herokuapp.com/profile/${localStorage.getItem(
        "userID"
      )}`,
      {
        headers: {
          "content-type": "application/json",
          Authorization: localStorage.getItem("token")
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
        console.log(data)
        dispatch(user.actions.setUser(data));
      })
      .catch((error) => {
        console.log(error)
        dispatch(user.actions.setErrors(error))});
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
          localStorage.setItem("userID", json.userID);
          dispatch(user.actions.setUser(json.loggedOut));
        } else {
          console.log("error");
        }
      })
      .catch((error) => console.log(error));
  };
};
export default user;
