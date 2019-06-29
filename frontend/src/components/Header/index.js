import React from 'react';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {
  Container, Content, Title, Login, UserName,
} from './style';

import { isAuthenticated, getUser } from '../../services/auth';

import logo from '../../assets/logo.png';
import logout from '../../assets/logout.png';

const LoginArea = isAuthenticated() ? (
  <>
    <UserName>
      Olá,
      {getUser().username}
    </UserName>
    <div>
      <img src={logout} alt="logout" />
    </div>
  </>
) : (
  <Button variant="outline-light">Entrar</Button>
);

const Header = () => (
  <Container>
    <Content>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <Title>Parque de Diversão PSA</Title>
      <Login>{LoginArea}</Login>
    </Content>
  </Container>
);

export default Header;
