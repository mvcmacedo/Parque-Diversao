import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col } from 'react-bootstrap';

import {
  Container, FormWrapper, ButtonWrapper, LinkWrapper,
} from './style';

import api from '../../services/api';
import { login } from '../../services/auth';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [isStudent, setIsStudent] = useState('');

  const handleSubmit = async () => {
    const request = {
      name,
      username,
      email,
      password,
      age,
      is_student: isStudent,
    };

    const user = await api.post('/user', request);

    const session = await api.post('/session', {
      email: user.data.data.email,
      password: user.data.data.password,
    });

    login(session.data.data);
  };

  return (
    <Container>
      <FormWrapper>
        <Form as={Col} sm="12">
          <Form.Row>
            <Form.Group as={Col} sm="6" controlId="">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                placeholder="Digite seu nome"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} sm="6" controlId="">
              <Form.Label>Usuário</Form.Label>
              <Form.Control
                placeholder="Digite seu nome de usuário"
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm="12" controlId="">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                placeholder="Digite seu e-mail "
                value={email}
                type="text"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} sm="6" controlId="">
              <Form.Label>Senha</Form.Label>
              <Form.Control
                placeholder="Digite sua senha"
                value={password}
                type="password"
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} sm="6" controlId="">
              <Form.Label>Idade</Form.Label>
              <Form.Control
                placeholder="Digite sua idade"
                type="number"
                value={age}
                onChange={e => setAge(e.target.value)}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group id="" onChange={e => setIsStudent(e.target.value)}>
            <Form.Check type="checkbox" value label="Estudante?" />
          </Form.Group>

          <LinkWrapper>
            <Link to="/signup">Já tem conta? Clique aqui para fazer o login.</Link>
          </LinkWrapper>

          <ButtonWrapper>
            {' '}
            <Button onClick={handleSubmit} variant="success">
              Cadastrar
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default SignUp;
