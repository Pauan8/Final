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
      }).then((res) => res.json());
    },
    user: (getState) => {
      return fetch(`${BASE_URL}/profile/${getState().user.userInfo.userID}`, {
        headers: {
          "content-type": "application/json",
          Authorization: getState().user.accessToken,
        },
      }).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    signup: (username, password, name, surname, e_mail) => {
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
          e_mail,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    edit: (avatar, name, surname, e_mail, description, age, getState) => {
      return fetch(
        `${BASE_URL}/profile/${getState().user.userInfo.userID}/edit`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: getState().user.accessToken,
          },
          body: JSON.stringify({
            avatar,
            name,
            surname,
            e_mail,
            description,
            age,
          }),
        }
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    addGame: (getState, game, list) => {
      return fetch(
        `${BASE_URL}/profile/${
          getState().user.userInfo.userID
        }/addGame?list=${list}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: getState().user.accessToken,
          },
          body: JSON.stringify({
            [list]: game,
          }),
        }
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    removeGame: (getState, game, list) => {
      return fetch(
        `${BASE_URL}/profile/${
          getState().user.userInfo.userID
        }/removeGame?list=${list}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: getState().user.accessToken,
          },
          body: JSON.stringify({
            [list]: game,
          }),
        }
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
  },
  games: {
    list: (type, value) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&${type}=${value}`
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    filteredList: (getState) => {
      let filterArr = "";
      const getFiltering = () => {
        getState().boardGames.filter.map((item) => {
          console.log(`${Object.keys(item).map((k) => `&${k}=${item[k]}`)}`);
          filterArr += `${Object.keys(item).map((k) => `&${k}=${item[k]}`)}`;
        });
        return filterArr.toString().replaceAll(",&", "&")
      };

      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx${getFiltering()}`
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    game: (id) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&ids=${id}`
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
  },
};