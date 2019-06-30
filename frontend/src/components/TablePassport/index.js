import React, { useState } from 'react';
import moment from 'moment';

import { Table, Button, Modal } from 'react-bootstrap';

import ticket from '../../assets/ticket.png';

import {
  Container, Th, Thead, Header,
} from './style';

import api from '../../services/api';

const TablePassport = ({ data }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBuy = async (passportId) => {
    await api.put(`/passport/buy/${passportId}`);

    setShowModal(true);
  };

  return (
    <Container>
      <Modal show={showModal}>
        <Modal.Header closeButton>
          <Modal.Title>Compra Passaporte</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Passaporte comprado com sucesso!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={() => window.location.reload()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
      <Header>
        <img src={ticket} alt="ticket-logo" />
        <h1>Passaportes</h1>
      </Header>
      <Table striped borderless hover responsive>
        <Thead>
          <tr>
            <Th>#</Th>
            <Th>Código</Th>
            <Th>Preço</Th>
            <Th>Status</Th>
            <Th>Número de Dias</Th>
            <Th>Data de Início</Th>
            <Th>Entradas</Th>
            <Th>Ação</Th>
          </tr>
        </Thead>
        <tbody>
          {data.map(passport => (
            <tr key={passport.id}>
              <td>{passport.id}</td>
              <td>{passport.code || '--'}</td>
              <td>{`R$ ${passport.cost.toString().replace('.', ',')}`}</td>
              <td>{passport.status === 'Sold' ? 'Vendido' : 'Pendente'}</td>
              <td align="center">{passport.days}</td>
              <td>{moment(passport.initial_date).format('DD/MM/YYYY')}</td>
              <td align="center">{passport.entries}</td>
              <td>
                {passport.status === 'Quoted' && (
                  <Button variant="success" onClick={() => handleBuy(passport.id)}>
                    Comprar
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TablePassport;
