import React from 'react'
import styled from 'styled-components/macro'

import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Slideshow } from '../components/Slideshow'
import { Searchbar } from '../components/Searchbar'
import test from '../data/test.json'

const Section = styled.section`
`

const Title = styled.h2`
position: relative;
z-index: 5;
text-align: center;
font-family: "Raleway", sans-serif;
`

const Home = () => {
  return (
    <Section>
      <Header />
      <Sidebar />
      <Title>Catgories</Title>
      <Slideshow data={test.categories} />
      <Title>Top Rated</Title>
      <Slideshow data={test.categories} />
      <Title>New 2021</Title>
      <Slideshow data={test.categories} />
      <Searchbar />
    </Section>)
}

export default Home;