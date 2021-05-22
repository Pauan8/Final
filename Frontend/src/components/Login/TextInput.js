import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: '25ch'
  }
}));

export const TextInput = ({ title, helptext }) => {
  const classes = useStyles();
  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <FormControl
      variant="outlined"
      className={clsx(classes.margin, classes.textField)}>
      <InputLabel htmlFor={title} required={title === 'Username'}>{title}</InputLabel>
      <OutlinedInput
        id={title}
        value={name}
        onChange={handleChange}
        label={title} />
      <FormHelperText id={`${title}-helper-text`}>
        {helptext}
      </FormHelperText>
    </FormControl>
  )
}