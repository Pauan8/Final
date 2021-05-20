import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Slideshow } from '../components/Slideshow'
import { Searchbar } from '../components/Searchbar'
import test2 from '../data/test2.json'

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
      <Sidebar />
      <ListLink to="/GameList/Categories">
        <Title>Catgories</Title>
      </ListLink>
      <Slideshow data={test2.games} />
      <ListLink to="/GameList/TopTen">
        <Title>Top Rated</Title>
      </ListLink>
      <Slideshow data={test2.games} />
      <ListLink to="/GameList/NewReleases">
        <Title>New 2021</Title>
      </ListLink>
      <Slideshow data={test2.games} />
      <Searchbar />
    </Section>)
}

export default Home;