import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Button } from '../Reusable/Button'
import boardGames from '../../reducers/boardGames'

let searchString = "";
export const SearchButton = ({ value }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSearch = (type1, type2, value) => {
    if (
      (type1 === 'categories' ||
        type1 === 'mechanics' ||
        type1 === 'gt_min_age') &&
      value.length !== 0
    ) {
      searchString += `&${type1}=${value}`;
    }
    if (type1 === 'gt_min_playtime' && value[0] !== null) {
      searchString += `&${type1}=${(value[0]*60) - 1}&${type2}=${(value[1]*60) + 1}`;
    }
    if (
      (type1 === 'gt_min_players' ||
      type1 === 'gt_year_published') && value[0] !== null
    ) {
      searchString += `&${type1}=${value[0] - 1}&${type2}=${value[1] + 1}`;
    }
    return searchString;
  };
  

  const handleClick = (e) => {
    e.preventDefault();
    handleSearch('gt_min_players', 'lt_max_players', value.players);
    handleSearch('gt_min_playtime', 'lt_max_playtime', value.playtime);
    handleSearch('gt_min_age', '', value.minage);
    handleSearch('gt_year_published', 'lt_year_published', value.year);
    handleSearch('mechanics', '', value.mechanics);
    handleSearch('categories', '', value.categories)

    dispatch(boardGames.actions.setFilter())
    history.push(`/GameList/search/${searchString}`);
    searchString = [];
  };

  return <Button handleClick={handleClick} text="Advanced Search" size="small"/>;
};
