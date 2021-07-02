export const regexArr = [
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß0-9]{3,12}$/), value: "username"}, 
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß[\-\]]{1,50}$/),value: "name"},
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß[\-\]]{1,50}$/),value: "surname"},
    {regex: new RegExp(/^[^\s@]+@[^\s@]+$/), value: "e_mail"},
    {regex: new RegExp(/^[0-9]{1,3}$/),value: "age"},
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß0-9]{6,15}$/),value: "password"}
  ]