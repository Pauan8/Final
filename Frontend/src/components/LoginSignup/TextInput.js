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

export const TextInput = ({ title, setValue, value, min, max }) => {
  const classes = useStyles();
  const [error, setError] = useState(false)

  const handleChange = (e) => {
      const newValue = e.target.value;
      if ((newValue.length < min || newValue.length > max) 
      && newValue.match(/[%<>\\$'"]/)){
        setError(`Should be ${min}-${max} chars & not contain %<>$'\"`)
      } else if(newValue.length < min || newValue.length > max){
        setError(`Should be ${min}-${max} characters`)
      } else if (newValue.match(/[%<>\\$'"]/)) {
        setError("Forbidden: %<>$'\"")
      } else {
        setError( "");
      }
      setValue({...value, [title]: e.target.value});
    }
     
  return (
    <FormControl
      variant="outlined"
      className={clsx(classes.margin, classes.textField)}>
      <InputLabel htmlFor={title} required={title === 'username'}>{title}</InputLabel>
      <OutlinedInput
        id={title}
        value={value.title}
        onChange={handleChange}
        label={title}
        error={!!error}
        />
      <FormHelperText id={`${title}-helper-text`}>
        {error}
      </FormHelperText>
    </FormControl>
  )
}