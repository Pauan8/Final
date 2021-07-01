import React, { useEffect } from 'react';
import styled from 'styled-components/macro';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUser } from 'reducers/user';
import { LottieAnimation } from '../animation/LottieAnimation';
import loading from 'animation/json/loading.json';
import { Profile } from '../components/User/Profile/Profile';
import { ProfileGameList } from '../components/User/Profile/ProfileGameList';
import { Menu } from '../components/Menu';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 150px);
  width: 100%;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
  }
`;

const PrivateProfile = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.ui.isLoading);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(fetchUser())
    } else {
      history.push('/signup');
    }
  }, [dispatch, history]);

  return (
    <>
      <Menu />
      <Wrapper>
        {!isLoading ? (
          <>
            <Profile id={id} mode="private" />
            <ProfileGameList mode='private' />
          </>
        ) : (
          <LottieAnimation lotti={loading} height={300} width={300} />
        )}

      </Wrapper>
    </>
  );
};

export default PrivateProfile;
