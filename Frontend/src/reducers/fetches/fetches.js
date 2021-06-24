const BASE_URL = 'https://secure-escarpment-13722.herokuapp.com'


const testResponse = (response) => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response.json();
};

const authHeaders =  {
    'content-type': 'application/json',
    Authorization: localStorage.getItem('token'),
  }


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
      return fetch(`${BASE_URL}/profile/${localStorage.getItem('userID')}`, {
        headers: authHeaders,
      })
      .then((response) => 
        testResponse(response));
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
      }).then((response) => 
        testResponse(response));
    },
    edit: (avatar, name, surname, e_mail, description, age) => {
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/edit`,
        {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({
            avatar,
            name,
            surname,
            e_mail,
            description,
            age,
          }),
        }
      ).then((response) => 
        testResponse(response));
    },
    addFriend: (username) => {
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/addFriend/${username}`,
        {
          method: 'POST',
          headers: authHeaders,
        })
        .then((response) => 
          testResponse(response));
      },
    answerFriendRequest: (userId, status) =>{
      return fetch(
        `${BASE_URL}/profile/${
          localStorage.getItem('userID')
        }/friendRequest/${userId}?status=${status}`,
        {
          method: 'POST',
          headers: authHeaders,
        })
        .then((response) => 
          testResponse(response));
      },
    addGame: (game, list) => {
      return fetch(
        `${BASE_URL}/profile/${
          localStorage.getItem('userID')
        }/addGame/${game.id}?list=${list}`,
        {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({
            [list]: game
          })
        }
      ).then((response) => 
        testResponse(response));
    },
    removeGame: ( id, list) => {
      return fetch(
        `${BASE_URL}/profile/${
          localStorage.getItem('userID')
        }/removeGame/${id}?list=${list}`,
        {
          method: 'DELETE',
          headers: authHeaders,
        }
      ).then((response) => 
        testResponse(response));
    },
  },

  games: {
    list: (type, value, page) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx&${type}=${value}&skip=${(page-1)*21}`
      ).then((response) => 
        testResponse(response));
    },
    filteredList: (getState, page) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx${getState().boardGames.filter}&skip=${(page-1)*21}`
      ).then((response) => 
        testResponse(response));
    },
    game: (id) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&ids=${id}`
      ).then((response) => 
        testResponse(response));
    },
  },
};
