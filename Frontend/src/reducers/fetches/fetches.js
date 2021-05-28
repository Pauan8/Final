export const fetches = {
    profile: {
      auth: (username, password) => {
    return fetch("https://secure-escarpment-13722.herokuapp.com/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((res) => res.json());
  },
    user: (userID, getState) => {
      return  fetch(
          `https://secure-escarpment-13722.herokuapp.com/profile/${userID}`,
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
            return fetch("https://secure-escarpment-13722.herokuapp.com/users", {
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
          return fetch(`https://secure-escarpment-13722.herokuapp.com/profile/${getState().user.userInfo.userID}/addGame?list=${list}`, {
          method: 'POST',
          headers: {
            "content-type": "application/json",
            Authorization: getState().user.accessToken
          },
          body: JSON.stringify({id: game})
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