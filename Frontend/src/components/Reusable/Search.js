import React, { useState } from 'react';
import { makeStyles, InputBase, Paper, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 200,
    height: 30,
    marginTop: 10,
    marginBottom: 10,

    [theme.breakpoints.up('md')]: {
      width: 250,
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
}));

export const Search = ({ mode }) => {
  const classes = useStyles();
  const [userInput, setUserInput] = useState('');

  return (
    <Paper className={classes.root}>
      <InputBase
        className={classes.input}
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder={mode === 'games' ? 'Search Boardgame' : 'Search user'}
        inputProps={{
          'aria-label': mode === 'games' ? 'Search Boardgame' : 'Search user',
        }}
      />
      <Link
        onClick={() => setUserInput('')}
        to={
          mode === 'games'
            ? `/GameList/name/${userInput}`
            : `/User/${userInput}`
        }
      >
        <IconButton
          type='submit'
          className={classes.iconButton}
          aria-label='search'
        >
          <SearchIcon />
        </IconButton>
      </Link>
    </Paper>
  );
};
