//const BASE_URL = "https://secure-escarpment-13722.herokuapp.com"
const BASE_URL = "http://localhost:8080"

export const fetches = {
    profile: {
      auth: (username, password) => {
        return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      .then((res) => res.json());
    },
    user: (userID, getState) => {
      return  fetch(
          `${BASE_URL}/profile/${userID}`,
          {
            headers: {
              "content-type": "application/json",
              Authorization: getState().user.accessToken
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw Error(response.statusText);
            }
            return response.json();
          })
      },
      signup: ( username, password, name, surname, e_mail ) => {
            return fetch(`${BASE_URL}/users`, {
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
              .then((response) => {
                if (!response.ok) {
                  throw Error(response.statusText);
                }
                return response.json();
              })
        },
        addGame: ( getState, game, list ) => {
          return fetch(`${BASE_URL}/profile/${getState().user.userInfo.userID}/addGame?list=${list}`, {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            Authorization: getState().user.accessToken
          },
          body: JSON.stringify({
            [list]: game
          })
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        })
      }
    },
        games:
       { list: (type, value) => {
          return  fetch(
           `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&${type}=${value}`
         )
           .then((response) => {
             if (!response.ok) {
               throw Error(response.statusText);
             }
             return response.json();
           })
       },
       game: (id) => {
           return    fetch(
               `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&ids=${id}`
             )
               .then((response) => {
                 if (!response.ok) {
                   throw Error(response.statusText);
                 }
                 return response.json();
               })
   
       }
    }}