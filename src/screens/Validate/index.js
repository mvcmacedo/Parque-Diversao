import React, { useState } from 'react';
import { Form, Col, Button } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import { Container, FormWrapper, ButtonWrapper } from './style';

import api from '../../services/api';
import Loader from '../../components/Loader';

const Validate = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleValidation = async () => {
    setLoading(true);
    await api
      .post('/passport/validate', { code })
      .then(() => {
        toast.success('Passaporte validado com sucesso!');
        setLoading(false);
        setCode('');
      })
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
              {loading ? <Loader width={50} height={20} show={loading} /> : 'Validar'}
            </Button>
          </ButtonWrapper>
        </Form>
      </FormWrapper>
    </Container>
  );
};

export default Validate;
