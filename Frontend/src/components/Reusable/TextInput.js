import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  textField: {
    width: '25ch',
  },
}));

export const TextInput = ({ title, setValue, value, regexp }) => {
  const classes = useStyles();
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    if ((title = 'e_mail' && !regexp.test(newValue))) {
      setErrorText('Enter a valid e-mail');
      setError(true);
    } else if (!regexp.test(newValue)) {
      setErrorText('Should not contain special characters');
      setError(true);
    } else {
      setErrorText('');
      setError(false);
    }
    setValue({ ...value, [e.target.id]: e.target.value });
  };

  return (
    <FormControl
      variant='outlined'
      className={clsx(classes.margin, classes.textField)}
    >
      <InputLabel htmlFor={title} required={title === 'username'}>
        {title}
      </InputLabel>
      <OutlinedInput
        id={title}
        value={value.title}
        onChange={handleChange}
        label={title}
        error={error}
      />
      <FormHelperText id={`${title}-helper-text`}>{errorText}</FormHelperText>
    </FormControl>
  );
};
