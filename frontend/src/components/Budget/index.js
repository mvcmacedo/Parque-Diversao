import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Button, Col, Modal,
} from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container, FormTitle, ButtonWrapper } from './style';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

const Budget = () => {
  const [promoList, setPromoList] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [email, setEmail] = useState('');
  const [initialDate, setInitialDate] = useState(null);
  const [days, setDays] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchPromos() {
      const allPromos = await api.get('/promotion?is_active=1');

      setPromoList(allPromos.data.data);
    }

    fetchPromos();
  }, []);

  const handlePromotion = (e) => {
    const selectedId = parseInt(e.target.value, 10);
    const find = promotions.filter(id => id === selectedId);

    if (find.length === 0) {
      promotions.push(selectedId);
      setPromotions(promotions);
    } else {
      setPromotions(promotions.filter(id => id !== selectedId));
    }
  };

  const handleSubmit = async () => {
    const request = {
      email,
      initial_date: initialDate,
      days,
      promotions,
    };

    await api.post('/passport/budget', request).then(() => {
      setShowModal(true);
    });
  };

  return (
    <Container>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Orçamento</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Orçamento gerado com sucesso, verifique seus passaportes para finalizar a compra.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success">
            <Link to={isAuthenticated() ? '/meus-passaportes' : '/signin'}>Ok</Link>
          </Button>
        </Modal.Footer>
      </Modal>
      <FormTitle>Orçamento</FormTitle>
      <Form>
        <Form.Row>
          <Form.Group as={Col} sm="6" controlId="">
            <Form.Label>Data</Form.Label>
            <DatePicker
              className="form-control"
              placeholderText="Data Inicial"
              selected={initialDate}
              dateFormat="dd/MM/yyyy"
              onChange={e => setInitialDate(e)}
            />
          </Form.Group>

          <Form.Group as={Col} sm="4" controlId="">
            <Form.Label>Número de dias</Form.Label>
            <Form.Control
              type="number"
              placeholder="Número Dias"
              value={days}
              onChange={e => setDays(e.target.value)}
            />
          </Form.Group>
        </Form.Row>

        <Form.Group controlId="">
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="Digite o e-mail da sua conta do parque"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Row>
          <Form.Group id="" onChange={handlePromotion}>
            <Form.Label>Promoções</Form.Label>
            {promoList.map(promo => (
              <Form.Check key={promo.id} type="checkbox" value={promo.id} label={promo.name} />
            ))}
          </Form.Group>
        </Form.Row>

        <ButtonWrapper>
          {' '}
          <Button onClick={handleSubmit} variant="success">
            Solicitar
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

export default Budget;
