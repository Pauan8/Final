const BASE_URL = 'https://secure-escarpment-13722.herokuapp.com'

export const fetches = {
  profile: {
    auth: (username, password) => {
      return fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      }).then((res) => res.json());
    },
    user: () => {
      return fetch(`${BASE_URL}/profile/${sessionStorage.getItem('userID')}`, {
        headers: {
          'content-type': 'application/json',
          Authorization: sessionStorage.getItem('token'),
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
        method: 'POST',
        headers: {
          'content-type': 'application/json',
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
    edit: (avatar, name, surname, e_mail, description, age) => {
      return fetch(
        `${BASE_URL}/profile/${sessionStorage.getItem('userID')}/edit`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: sessionStorage.getItem('token'),
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
    addFriend: (username) => {
      return fetch(
        `${BASE_URL}/profile/${sessionStorage.getItem('userID')}/addFriend/${username}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: sessionStorage.getItem('token')
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        });
      },
    answerFriendRequest: (username, status) =>{
      return fetch(
        `${BASE_URL}/profile/${
          sessionStorage.getItem('userID')
        }/friendRequest/${username}?status=${status}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: sessionStorage.getItem('token')
          },
        })
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.json();
        });
      },
    addGame: ( game, list) => {
      return fetch(
        `${BASE_URL}/profile/${
          sessionStorage.getItem('userID')
        }/addGame/${game.id}?list=${list}`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            Authorization: sessionStorage.getItem('token'),
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
    removeGame: ( game, list) => {
      return fetch(
        `${BASE_URL}/profile/${
          sessionStorage.getItem('userID')
        }/removeGame/${game.id}?list=${list}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            Authorization: sessionStorage.getItem('token'),
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
    list: (type, value, page) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx&${type}=${value}&skip=${(page-1)*21}`
      ).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      });
    },
    filteredList: (getState, page) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx${getState().boardGames.filter}&skip=${(page-1)*21}`
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
