import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Col } from 'react-bootstrap';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Container, FormTitle, ButtonWrapper, LinkWrapper,
} from './style';

import Loader from '../Loader';

import api from '../../services/api';
import { isAuthenticated } from '../../services/auth';

const Budget = () => {
  const [promoList, setPromoList] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [email, setEmail] = useState('');
  const [initialDate, setInitialDate] = useState(null);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    async function fetchPromos() {
      await api
        .get('/promotion?is_active=1')
        .then(({ data }) => {
          setPromoList(data.data);
          setLoading(false);
        })
        .catch(() => toast.error('Erro ao listar promoções.'));
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
    setButtonLoading(true);
    const request = {
      email,
      initial_date: initialDate,
      days,
      promotions,
    };

    await api
      .post('/passport/budget', request)
      .then(() => {
        toast.success('Orçamento gerado com sucesso! Verifique seus passaportes.');
        setEmail('');
        setInitialDate(null);
        setDays(1);
        setButtonLoading(false);
      })
      .catch((err) => {
        toast.error(
          err.response.data.error.message === 'User not Found'
            ? 'Usuário não encontrado'
            : 'Erro ao gerar orçamento',
        );
        setButtonLoading(false);
      });
  };

  return (
    <Container>
      <ToastContainer />

      {loading ? (
        <Loader width={100} height={100} show={loading} />
      ) : (
        <>
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
                  max={7}
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

            {!isAuthenticated() && (
              <LinkWrapper>
                <Link to="/signup">Não tem conta? Clique aqui.</Link>
              </LinkWrapper>
            )}

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
                {buttonLoading ? (
                  <Loader width={50} height={20} show={buttonLoading} />
                ) : (
                  'Solicitar'
                )}
              </Button>
            </ButtonWrapper>
          </Form>
        </>
      )}
    </Container>
  );
};

export default Budget;
