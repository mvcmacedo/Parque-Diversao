import React, { useState } from 'react';
import moment from 'moment';

import { Table, Button } from 'react-bootstrap';

import { ToastContainer, toast } from 'react-toastify';
import Loader from '../Loader';

import ticket from '../../assets/ticket.png';

import {
  Container, Th, Thead, Header, TableWrapper,
} from './style';

import api from '../../services/api';

const TablePassport = ({ data, fetchPassports }) => {
  const [loading, setLoading] = useState(false);

  const handleBuy = async (passportId) => {
    setLoading({ load: true, id: passportId });
    await api
      .put(`/passport/buy/${passportId}`)
      .then(() => {
        toast.success('Compra confirmada!');
        fetchPassports();
      })
      .catch((err) => {
        toast.error(err.response.data.error.message);
        setLoading(false);
      });
  };

  return (
    <Container>
      <ToastContainer />
      <TableWrapper>
        <Header>
          <img src={ticket} alt="logo" />
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
                      {loading.load && loading.id === passport.id ? (
                        <Loader width={50} height={20} show={loading.load} />
                      ) : (
                        'Comprar'
                      )}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default TablePassport;
