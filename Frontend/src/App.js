import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './pages/Home'
import GameList from './pages/GameList'
import { Footer } from './components/Footer'

const Wrapper = styled.div`
  min-height: 100vh;
  background-image: url("https://images.unsplash.com/photo-1547638369-03b0e69b28d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80");
  background-attachment: fixed;
  background-size: cover;
  background-position-y: top;
  background-repeat: no-repeat;
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: white;
  opacity: 0.9;
`;

export const App = () => {
  return (
    <Router>
      <Switch>
        <Wrapper>
          <Overlay />
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/GameList/:type">
            <GameList />
          </Route>
          <Footer />
        </Wrapper>
      </Switch>
    </Router>
  )
}
