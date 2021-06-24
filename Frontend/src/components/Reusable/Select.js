import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components/macro';

const FormInner = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px;
`;

export const Select = ({ arr, value, handleChange, title }) => {
  return (
    <FormInner>
      <TextField
        id={`select-${title}`}
        select
        name={title}
        label='Select'
        value={value}
        onChange={handleChange}
        helperText={`Choose ${title}`}
        size='small'
        InputLabelProps={{ style: { fontSize: '12px' } }}
        InputProps={{ style: { fontSize: '12px' } }}
      >
        {arr.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {title === 'avatar' ? (
              <img src={require(`../../assets/avatar/${option.name}`)} alt='user avatar'/>
            ) : (
              option.name
            )}
          </MenuItem>
        ))}
      </TextField>
    </FormInner>
  );
};
