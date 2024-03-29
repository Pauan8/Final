import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';


import Home from '../pages/Home';
import GameList from '../pages/GameList';
import { Footer } from '../components/Footer';
import SingleGame from '../pages/SingleGame';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import PrivateProfile from '../pages/PrivateProfile';
import PublicProfile from '../pages/PublicProfile';
import EditProfile from '../pages/EditProfile';

const Wrapper = styled.div`
  min-height: 100vh;
  background-image: url('https://images.unsplash.com/photo-1547638369-03b0e69b28d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80');
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

const Main = styled.div`
  min-height: calc(100vh - 100px);
  padding-bottom: 50px;
`;

const Routing = () => {

  return (
    <Router>
      <Switch>
        <Wrapper>
          <Main>
            <Overlay />
            <Route path='/' exact component={Home} />
            <Route path='/Login' exact component={Signin} />
            <Route path='/Signup' exact component={Signup} />
            <Route path='/Profile/:id' exact component={PrivateProfile} />
            <Route path='/Profile/:id/edit' exact component={EditProfile} />
            <Route path='/User/:username' exact component={PublicProfile} />
            <Route path='/GameList/:type/:value' component={GameList} />
            <Route path='/Game/:Id' component={SingleGame}/>
          </Main>
          <Footer />
        </Wrapper>
      </Switch>
    </Router>
  );
};

export default Routing;
