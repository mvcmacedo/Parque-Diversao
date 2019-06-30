import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';

import {
  Container, FormWrapper, ButtonWrapper, LinkWrapper,
} from './style';

import api from '../../services/api';
import { login } from '../../services/auth';

const SignIn = () => {
  const [emailUsername, setEmailUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const request = {
      password,
    };

    if (emailUsername.includes('@')) {
      request.email = emailUsername;
    } else {
      request.username = emailUsername;
    }

    const session = await api.post('/session', request);
    login(session.data.data);
  };

  return (
    <Container>
      <FormWrapper>
        <Form as={Col} sm="12">
          <Form.Group as={Col} sm="12" controlId="">
            <Form.Label>E-mail ou Usuário</Form.Label>
            <Form.Control
              placeholder="Digite o e-mail ou usuário"
              value={emailUsername}
              type="text"
              onChange={e => setEmailUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} sm="12" controlId="">
            <Form.Label>Senha</Form.Label>
            <Form.Control
              placeholder="Digite sua senha"
              value={password}
              type="password"
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <LinkWrapper>
            <Link to="/signup">Não tem conta? Clique aqui.</Link>
          </LinkWrapper>

          <ButtonWrapper>
            {' '}
            <Button onClick={handleLogin} variant="success">
              Entrar
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
