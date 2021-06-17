import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';
import { useDispatch } from 'react-redux';

import { fetchUser } from '../reducers/user';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Slideshow } from '../components/Games/Slideshow';
import { SearchMenu } from '../components/Filter/SearchMenu';

const Section = styled.section`
`

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;`

const ListLink = styled(Link)`
  text-decoration-line: none;
  color: darkslategray;
  font-weight: 600;
  font-size: 25px;
`;

const Title = styled.h2`
  position: relative;
  z-index: 5;
  width: 500px;
  max-width: 100vw;
  margin-bottom: 0;
  margin-top: 50px;
  color: #011126;
  text-align: center;
`;

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Section>
         <Header />
      <SearchMenu />
      <Sidebar />
      <Wrapper>
      <ListLink to='/GameList/order_by/popularity'>
        <Title> &#8640; Top Rated</Title>
      </ListLink>
      <Slideshow type='order_by' value='popularity'  />
      <ListLink to='/GameList/order_by/discount'>
        <Title> &#8640; Discounted</Title>
      </ListLink>
      <Slideshow type='order_by' value='discount' />
      <ListLink to='/GameList/year_published/2021'>
        <Title> &#8640; New 2021</Title>
      </ListLink>
      <Slideshow type='year_published' value='2021' />
      </Wrapper>
    </Section>
  );
};

export default Home;
