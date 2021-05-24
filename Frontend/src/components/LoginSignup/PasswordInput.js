import React, { useState } from 'react'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1)
  },
  textField: {
    width: '25ch'
  }
}));

export const PasswordInput = ({ type, value, setValue }) => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (event) => {
    setValue({...value, password: event.target.value})
  }

  const handleMouseDown = (event) => {
    event.preventDefault();
  };

  return (
    <FormControl
      className={clsx(classes.margin, classes.textField)}
      variant="outlined">
      <InputLabel htmlFor="password" required>password</InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? 'text' : 'password'}
        value={value.password}
        onChange={handleChange}
        minLength="6"
        maxLength="15"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClick}
              onMouseDown={handleMouseDown}
              edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        labelWidth={70} />
      <FormHelperText id="password-hepler-text">
        {type === 'Login' ? 'Enter your password' : 'Choose password 6-15 chars'}
      </FormHelperText>
    </FormControl>)
}