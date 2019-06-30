import React, { useState } from 'react';
import {
  Form, Col, Button, Modal,
} from 'react-bootstrap';

import { Container, FormWrapper, ButtonWrapper } from './style';

import api from '../../services/api';

const Validate = () => {
  const [code, setCode] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleValidation = async () => {
    const validate = await api.post('/passport/validate', { code });

    setShowModal(validate.data.data);
  };

  return (
    <Container>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Validar Passaporte</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Passaporte validado com sucesso! Uma entrada foi adicionada.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>

      <FormWrapper>
        <Form as={Col} sm="12">
          <Form.Group as={Col} sm="12" controlId="">
            <Form.Label>Código do Passaporte</Form.Label>
            <Form.Control
              placeholder="Digite o código para validar entrada no parque"
              type="text"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </Form.Group>

          <ButtonWrapper>
            {' '}
            <Button onClick={handleValidation} variant="success">
              Validar
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Validate;
