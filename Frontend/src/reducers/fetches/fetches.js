//const BASE_URL = 'https://secure-escarpment-13722.herokuapp.com'
const BASE_URL = 'http://localhost:8080'

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
    addFriend: (friend_id) => {
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/addFriend/${friend_id}?status=0`,
        {
          method: 'POST',
          headers: authHeaders,
        })
        .then((response) => 
          testResponse(response));
      },
    removeFriend: (friend_id)  => {
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/removeFriend/${friend_id}`,
        {
          method: 'POST',
          headers: authHeaders,
        })
        .then((response) => 
          testResponse(response));
      },
    answerFriendRequest: (friend_id, status) =>{
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/updateFriend/${friend_id}?status=${status}`,
        {
          method: 'POST',
          headers: authHeaders,
        })
        .then((response) => 
          testResponse(response));
      },
      getMessages: (username) => {
        return fetch(
          `${BASE_URL}/profile/${localStorage.getItem('userID')}/message/${username}`,
          {
          headers: authHeaders
          })
        .then((response) => 
        testResponse(response));
      }, 
      sendMessage: (username, message) => {
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/message/${username}`,
        {
          method: 'POST',
          headers: authHeaders,
          body: JSON.stringify({
            message
          })
        })
        .then((response) => 
        testResponse(response));
    },
    addGame: (game, list) => {
      return fetch(
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/addGame/${game.id}?list=${list}`,
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
        `${BASE_URL}/profile/${localStorage.getItem('userID')}/removeGame/${id}?list=${list}`,
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
    searchList: (getState, page) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx${getState().boardGames.searchString}&skip=${(page-1)*21}`
      ).then((response) => 
        testResponse(response));
    },
    filterList: ( getState, type, mode, page) => {
      let filteredString = ""
      const handleFilter = () =>{
        for( let [key, value] of getState().boardGames.filters[0].entries()){
          console.log(typeof value)
        for( let [k, val] of Object.entries(value)){
          filteredString += `&${k}=${val}`
        }
      }
        return filteredString;
      }
      if (type === "search") {
        return fetch(
          `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx${getState().boardGames.searchString}
          ${handleFilter()}&skip=${(page - 1) * 21}`
        ).then((response) => testResponse(response));
      } else {
        return fetch(
          `https://api.boardgameatlas.com/api/search?limit=21&pretty=true&client_id=39WI5Y3mBx&${type}=${mode}${handleFilter()}&skip=${
            (page - 1) * 21
          }`
        ).then((response) => testResponse(response));
      }
    },
    game: (id) => {
      return fetch(
        `https://api.boardgameatlas.com/api/search?limit=20&pretty=true&client_id=39WI5Y3mBx&ids=${id}`
      ).then((response) => 
        testResponse(response));
    },
  },
};
