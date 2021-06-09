import React, { useState} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
      width: 200,
    },
  });

const PrettoSlider = withStyles({
    root: {
      color: '#52af77',
      height: 8,
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

  function ThumbComponent(props) {
    return (
      <span {...props}>
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </span>
    );
  }


export const RangeSlider = ({ title, text, value, setValue, label, min, max, step}) => {
  const classes = useStyles();

  const handleChange = (props) => (event, newValue) => {
      setValue({... value, [props]: newValue})
  }

  return (
    <div className={classes.root}>
      <Typography id="discrete-slider-always" gutterBottom>
        {label}
      </Typography>
      <PrettoSlider
        min={min}
        step={step}
        max={max}
        value={value[title]}
        onChange={handleChange(title)}
        valueLabelDisplay="on"
        aria-labelledby="range-slider"
        getAriaValueText={text}
      />
    </div>
  );
}