import React, { useState } from 'react';
import {
  Checkbox,
  FormControlLabel,
  Typography,
  withStyles, 
  makeStyles,
  Slider
} from '@material-ui/core';


const useStyles = makeStyles({
  root: {
    width: 300,
  },
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 12
  },
  checkbox: {
    paddingRight: 2
  }
});

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
    marginTop: 10,
    marginBottom: 20
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
    top: -22,
    '& *': {
      background: 'transparent',
      color: '#000',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export const RangeSlider = ({
  title,
  text,
  value,
  setValue,
  label,
  min,
  max,
  step
}) => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true)

  const handleChange = (props) => (event, newValue) => {
    setValue({ ...value, [props]: newValue });
  };

  const handleChecked = () => {
    disabled?setValue({...value, [title]: [min, max]}):setValue({...value, [title]: [null, null]})
    setDisabled(!disabled)
    
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
      <Typography id='discrete-slider-always' gutterBottom>
        {label}
      </Typography>
      <FormControlLabel
        control={
          <Checkbox
            className={classes.checkbox}
            size="small"
            checked={!disabled}
            onChange={handleChecked}
            name="use-rangeslider"
          />
        }
        classes={{ label: classes.label}}
        label="Enable"
      />
      </div>
      <PrettoSlider
        min={min}
        step={step}
        max={max}
        value={value[title]}
        onChange={handleChange(title)}
        valueLabelDisplay='on'
        aria-labelledby='range-slider'
        getAriaValueText={text}
        disabled={disabled}
      />
    </div>
  );
};
