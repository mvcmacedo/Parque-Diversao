import React from 'react';
import { Button } from 'react-bootstrap';

import {
  Container, Content, Title, Login,
} from './style';

import { isAuthenticated } from '../../services/auth';

import logo from '../../assets/logo.png';

const LoginArea = isAuthenticated() ? (
  'Olá'
) : (
  <>
    <div>
      <Button variant="outline-light">SingIn</Button>
    </div>
    <div>
      <Button variant="outline-light">SingUp</Button>
    </div>
  </>
);

const Header = () => (
  <Container>
    <Content>
      <img src={logo} alt="logo" />
      <Title>Parque de Diversão PSA</Title>
      <Login>{LoginArea}</Login>
    </Content>
  </Container>
);

export default Header;
