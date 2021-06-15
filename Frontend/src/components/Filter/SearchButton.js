import React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import boardGames, {
  genereateFilteredGamesList,
} from '../../reducers/boardGames';

const Button = styled.button`
  margin-top: 20px;
`;

let updateArr = [];
export const SearchButton = ({ value }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFilters = (type1, type2, value) => {
    if (
      (type1 === 'categories' ||
        type1 === 'mechanics' ||
        type1 === 'gt_min_age') &&
      value.length !== 0
    ) {
      updateArr.push({ [type1]: [value] });
    }
    if (type1 === 'gt_min_playtime' && value.length !== 0) {
      updateArr.push({
        [type1]: (value[0] !== 0 ? -1 : '') * 60,
        [type2]: (value[1] + 1) * 60,
      });
    }
    if (
      type1 === 'gt_min_players' ||
      (type1 === 'gt_year_published' && value.length !== 0)
    ) {
      updateArr.push({ [type1]: value[0] - 1, [type2]: value[1] + 1 });
    }
    return updateArr;
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleFilters('gt_min_players', 'lt_max_players', value.players);
    handleFilters('gt_min_playtime', 'lt_max_playtime', value.playtime);
    handleFilters('gt_min_age', '', value.minage);
    handleFilters('gt_year_published', 'lt_year_published', value.year);
    handleFilters('mechanics', '', value.mechanics);
    handleFilters('categories', '', value.categories);

    dispatch(boardGames.actions.setFilter(updateArr));
    dispatch(genereateFilteredGamesList('filtered'));
    updateArr = [];
    history.push('/GameList/Filtered');
  };

  return <Button onClick={handleClick}>Filter</Button>;
};
