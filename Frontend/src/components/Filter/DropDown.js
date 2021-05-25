import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import styled from 'styled-components/macro';

const FormInner = styled.div`
display: flex;
justify-content: center;
margin: 10px;
`;

export const DropDown = ({ arr }) => {
  const [category, setCategory] = useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <FormInner>
      <TextField
        id="select-category"
        select
        label="Select"
        value={category}
        onChange={handleChange}
        helperText="Choose a category"
        size="small"
        InputLabelProps={{ style: { fontSize: '12px' } }}
        InputProps={{ style: { fontSize: '12px' } }}>
        {arr.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
      </TextField>
    </FormInner>
  );
};
