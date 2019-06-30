import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

import { Container } from './style';

import { isAuthenticated, isAdmin } from '../../services/auth';

const NavBar = () => (
  <Container>
    <Navbar bg="light" variant="light" className="navbar">
      <Nav>
        <Nav.Link href="/">Orçamento</Nav.Link>
        <Nav.Link href="">Validar Passaporte</Nav.Link>
        {isAuthenticated() && <Nav.Link href="">Meus Passaportes</Nav.Link>}
        {isAdmin() && (
          <>
            <Nav.Link href="">Vendas</Nav.Link>
            <Nav.Link href="">Entradas</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  </Container>
);

export default NavBar;
