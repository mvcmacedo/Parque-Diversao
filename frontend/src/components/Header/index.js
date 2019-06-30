import React from 'react';
import { Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import {
  Container, Content, LogoWrapper, Title, TitleWrapper, Login, UserName,
} from './style';

import { isAuthenticated, getUser, logout } from '../../services/auth';

import logo from '../../assets/logo.png';
import logoutImg from '../../assets/logout.png';

const LoginArea = isAuthenticated() ? (
  <>
    <UserName>
      Olá,
      {' '}
      {''}
      {getUser().username}
    </UserName>
    <div>
      <Button variant="light" onClick={logout}>
        <img src={logoutImg} alt="logout" />
      </Button>
    </div>
  </>
) : (
  <>
    <Button variant="light">
      <Link to="/signin">Entrar</Link>
    </Button>
    <Button variant="light">
      <Link to="/signup">Cadastre-se</Link>
    </Button>
  </>
);

const Header = () => (
  <Container>
    <Content>
      <LogoWrapper>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </LogoWrapper>
      <TitleWrapper>
        <Title>PSA</Title>
      </TitleWrapper>
      <Login>{LoginArea}</Login>
    </Content>
  </Container>
);

export default Header;
