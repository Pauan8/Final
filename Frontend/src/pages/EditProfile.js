import React, { useEffect, useState } from 'react';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import picArray from '../data/picArray.json';
import { editProfile } from '../reducers/user';
import { DropDown } from '../components/Reusable/DropDown';
import { Button } from '../components/Reusable/Button';
import { TextInput } from '../components/Reusable/TextInput';
import { regexArr } from '../data/regExValdate';

const EditProfile = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState({
    avatar: '',
    name: '',
    surname: '',
    e_mail: '',
    description: '',
    age: '',
  });
  const handleChange = (e) => {
    setValue({ ...value, avatar: e.target.value });
  };

  const handleClick = () => {
    dispatch(
      editProfile(
        testContent(value.avatar),
        testContent(value.name),
        testContent(value.surname),
        testContent(value.e_mail),
        testContent(value.description),
        testContent(value.age)
      )
    );
  };

  const testContent = (props) => {
    return props != '' ? props : null;
  };

  return (
    <>
      <DropDown
        arr={picArray}
        handleChange={handleChange}
        value={value.avatar}
        title='avatar'
      />
      <TextInput
        title='name'
        setValue={setValue}
        value={value}
        regexp={regexArr[1].regex}
      />
      <TextInput
        title='surname'
        setValue={setValue}
        value={value}
        regexp={regexArr[2].regex}
      />
      <TextInput
        title='e_mail'
        setValue={setValue}
        value={value}
        regexp={regexArr[3].regex}
      />
      <TextInput
        title='age'
        setValue={setValue}
        value={value}
        regexp={regexArr[4].regex}
      />
      <TextInput
        title='description'
        setValue={setValue}
        value={value}
        regexp={new RegExp(/[a-z]/)}
      />
      <Button handleClick={handleClick} text='Save' />
    </>
  );
};

export default EditProfile;
