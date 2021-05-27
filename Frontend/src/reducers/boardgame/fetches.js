export const fetches = {
   list: (type, value) => {
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
}
