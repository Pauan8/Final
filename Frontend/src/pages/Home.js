import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components/macro'
import { useDispatch } from 'react-redux'

import { fetchUser } from '../reducers/user'
import { Sidebar } from '../components/Sidebar'
import { Header } from '../components/Header'
import { Slideshow } from '../components/Games/Slideshow'
import { SearchMenu } from '../components/Filter/SearchMenu'

const Section = styled.section`
`

const ListLink = styled(Link)`
text-decoration-line: none;
color: darkslategray;
font-weight: 600;
font-size: 25px;`

const Title = styled.h2`
position: relative;
z-index: 5;
text-align: center;
`

const Home = () => {
const dispatch= useDispatch()

  useEffect(() => {
    console.log("fetched")
    dispatch(fetchUser())
  }, [dispatch])

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