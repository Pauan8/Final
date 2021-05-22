import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Slideshow } from '../components/Slideshow'
import { SearchMenu } from '../components/SearchMenu'

const Section = styled.section`
`

const Title = styled.h2`
position: relative;
z-index: 5;
text-align: center;
font-family: "Raleway", sans-serif;
`

const ListLink = styled(Link)``

const Home = () => {
  return (
    <Section>
      <Header />
      <SearchMenu />
      <Sidebar />
      <ListLink to="/GameList/TopRated">
        <Title>Top Rated</Title>
      </ListLink>
      <Slideshow type="order_by" value="popularity" />
      <ListLink to="/GameList/Discounted">
        <Title>Discounted</Title>
      </ListLink>
      <Slideshow type="order_by" value="discount" />
      <ListLink to="/GameList/NewReleases">
        <Title>New 2021</Title>
      </ListLink>
      <Slideshow type="year_published" value="2021" />
    </Section>)
}

export default Home;