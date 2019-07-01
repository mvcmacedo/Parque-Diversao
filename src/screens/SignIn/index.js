import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';

import {
  Container, FormWrapper, ButtonWrapper, LinkWrapper,
} from './style';

import api from '../../services/api';
import { login } from '../../services/auth';

import Loader from '../../components/Loader';

const SignIn = () => {
  const [emailUsername, setEmailUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const request = {
      password,
    };

    if (emailUsername.includes('@')) {
      request.email = emailUsername;
    } else {
      request.username = emailUsername;
    }

    setLoading(true);

    await api
      .post('/session', request)
      .then(({ data }) => login(data.data))
      .catch((err) => {
        toast.error(err.response.data.error.message);
        setLoading(false);
      });
  };

  return (
    <Container>
      <ToastContainer />
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
              {loading ? <Loader width={50} height={20} show={loading} /> : 'Entrar'}
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SignIn;
