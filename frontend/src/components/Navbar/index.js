import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { Container } from './style';

import { isAuthenticated, isAdmin } from '../../services/auth';

const NavBar = () => (
  <Container>
    <Navbar bg="light" variant="light" className="navbar">
      <Nav>
        <Nav.Link href="/">Orçamento</Nav.Link>
        <Nav.Link href="/validar-passaporte">Validar Passaporte</Nav.Link>
        {isAuthenticated() && <Nav.Link href="/meus-passaportes">Meus Passaportes</Nav.Link>}
        {isAdmin() && (
          <>
            <Nav.Link href="/vendas">Vendas</Nav.Link>
            <Nav.Link href="/entradas">Entradas</Nav.Link>
            <Nav.Link href="/promocoes">Promoções</Nav.Link>
            <Nav.Link href="/usuarios">Usuários</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  </Container>
);

export default NavBar;
