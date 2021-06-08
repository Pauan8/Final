import React from "react";
import styled from "styled-components/macro";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import boardGames, {
  genereateFilteredGamesList,
} from "../../reducers/boardGames";
import {
  playersArr,
  playtimeArr,
  minAgeArr,
  yearsArr,
} from "../../data/choicesArrays";

const Button = styled.button`
  margin-top: 20px;
`;

let updateArr = [];
export const SearchButton = ({ value }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleFilters = (type, arr, i) => {
    if ((type === "categories" || type === "mechanics") && value[type] !== "") {
      updateArr.push({ [type]: [value[type]] });
    }
    if (arr.length > 0 && value[type] !== "" && arr[i - 1].name.length > 1) {
      updateArr.push({
        [arr[i - 1].name[0]]: [arr[i - 1].value[0]],
        [arr[i - 1].name[1]]: [arr[i - 1].value[1]],
      });
    } else if (arr.length > 0 && value[type] !== "") {
      updateArr.push({
        [arr[i - 1].name[0]]: [arr[i - 1].value[0]],
      });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    handleFilters("players", playersArr, value.players);
    handleFilters("playtime", playtimeArr, value.playtime);
    handleFilters("minage", minAgeArr, value.minage);
    handleFilters("year", yearsArr, value.year);
    handleFilters("mechanics", [], value.mechanics);
    handleFilters("categories", [], value.categories);

    dispatch(boardGames.actions.setFilter(updateArr));
    dispatch(genereateFilteredGamesList("filtered"));
    updateArr = [];
    history.push("/GameList/Filtered");
  };

  return <Button onClick={handleClick}>Filter</Button>;
};
