export const fetches = {
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
                .then((res) => res.json())
        }
  
    };