import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(() => ({
  checkboxLabel: {
    fontSize: 12,
  },
  label: {
    fontSize: 13,
    paddingBottom: 5,
  },
  radio: {
    '& .MuiSvgIcon-root': {
      height: 15,
      weight: 15,
    },
    padding: 3,
  },
}));

export const RadioButtons = ({ type, choices, value, handleChange }) => {
  const classes = useStyles();

  return (
    <FormControl component='fieldset'>
      <FormLabel className={classes.label} component='legend'>
        {type}
      </FormLabel>
      <RadioGroup
        aria-label={type}
        name={type}
        value={value}
        onChange={handleChange}
      >
        {choices.map((choice) => (
          <FormControlLabel
            key={choice.index}
            classes={{
              label: classes.checkboxLabel,
            }}
            value={choice.index}
            control={<Radio className={classes.radio} />}
            label={choice.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
