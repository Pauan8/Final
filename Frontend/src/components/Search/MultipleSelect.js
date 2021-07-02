import React from 'react';
import {
  makeStyles,
  useTheme,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 300,
    marginRigth: 20,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    objectFit: 'cover',
    overflowY: 'auto',
    maxHeight: 100,
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, option, theme) {
  return {
    fontWeight:
      option.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export const MultipleSelect = ({ array, value, handleChange, title }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id={title}>{title}</InputLabel>
      <Select
        labelId={title}
        id={title}
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id='select-multiple-chip' />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((choosen) => (
              <Chip
                key={choosen}
                label={array.find((item) => item.id === choosen).name}
                className={classes.chip}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {array.map((item) => (
          <MenuItem
            key={item.name}
            value={item.id}
            style={getStyles(item.name, value, theme)}
          >
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
