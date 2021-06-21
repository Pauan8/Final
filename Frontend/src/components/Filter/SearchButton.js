import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';

const Button = styled.button`
  margin-top: 20px;
`;

let filteredString = "";
export const SearchButton = ({ value }) => {
  const history = useHistory();

  const handleFilters = (type1, type2, value) => {
    if (
      (type1 === 'categories' ||
        type1 === 'mechanics' ||
        type1 === 'gt_min_age') &&
      value.length !== 0
    ) {
      filteredString += `&${type1}=${value}`;
    }
    if (type1 === 'gt_min_playtime' && value[0] !== null) {
      filteredString += `&${type1}=${(value[0]*60) - 1}&${type2}=${(value[1]*60) + 1}`;
    }
    if (
      (type1 === 'gt_min_players' ||
      type1 === 'gt_year_published') && value[0] !== null
    ) {
      filteredString += `&${type1}=${value[0] - 1}&${type2}=${value[1] + 1}`;
    }
    return filteredString;
  };
  

  const handleClick = (e) => {
    e.preventDefault();
    handleFilters('gt_min_players', 'lt_max_players', value.players);
    handleFilters('gt_min_playtime', 'lt_max_playtime', value.playtime);
    handleFilters('gt_min_age', '', value.minage);
    handleFilters('gt_year_published', 'lt_year_published', value.year);
    handleFilters('mechanics', '', value.mechanics);
    handleFilters('categories', '', value.categories)

    history.push(`/GameList/by_filter/${filteredString}`);
  };

  return <Button onClick={handleClick}>Filter</Button>;
};
