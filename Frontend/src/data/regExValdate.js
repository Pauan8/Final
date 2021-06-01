export const regexArr = [
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß0-9]*$/), value: "username"}, 
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß[\-\]]*$/),value: "name"},
    {regex: new RegExp(/^[a-zA-ZäöüÄÖÜß[\-\]]*$/),value: "surname"},
    {regex: new RegExp(/^[^\s@]+@[^\s@]+$/), value: "e_mail"}
  ]