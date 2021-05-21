import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles((theme) => ({
  checkboxLabel: {
    fontSize: 12
  },
  label: {
    fontSize: 13,
    paddingBottom: 5
  },
  radio: {
    '& .MuiSvgIcon-root': {
      height: 15,
      weight: 15
    },
    padding: 3
  }
}));

export const RadioButtons = () => {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel className={classes.label} component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        name="gender1"
        value={value}
        onChange={handleChange}>
        <FormControlLabel
          classes={{
            label: classes.checkboxLabel
          }}
          value="female"
          control={<Radio className={classes.radio} />}
          label="Female" />
        <FormControlLabel
          classes={{
            label: classes.checkboxLabel
          }}
          value="male"
          control={<Radio className={classes.radio} />}
          label="Male" />
        <FormControlLabel
          classes={{
            label: classes.checkboxLabel
          }}
          value="other"
          control={<Radio className={classes.radio} />}
          label="Other" />
        <FormControlLabel
          classes={{
            label: classes.checkboxLabel
          }}
          value="disabled"
          disabled
          control={<Radio className={classes.radio} />}
          label="(Disabled option)" />
      </RadioGroup>
    </FormControl>
  );
}