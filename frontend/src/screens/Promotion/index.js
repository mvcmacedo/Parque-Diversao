import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import moment from 'moment';

import { Table } from 'react-bootstrap';

import {
  Container, Thead, Th, Header, TableWrapper,
} from './style';

import api from '../../services/api';
import promo from '../../assets/promotion.png';

const Promotion = () => {
  const [promotions, setPromotions] = useState([]);

  const fetchPromotions = async () => {
    const promotionList = await api.get('/promotion');

    setPromotions(promotionList.data.data);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleStatus = async (id, is_active) => {
    await api.put(`/promotion/${id}`, { is_active });

    await fetchPromotions();
  };

  return (
    <Container>
      <TableWrapper>
        <Header>
          <img src={promo} alt="ticket-logo" />
          <h1>Promoções</h1>
        </Header>
        <Table striped borderless hover responsive>
          <Thead>
            <tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th>Apartir do dia</Th>
              <Th>Mínimo de dias</Th>
              <Th>Percentual</Th>
              <Th>Criada em</Th>
              <Th>Status</Th>
            </tr>
          </Thead>
          <tbody>
            {promotions.map(promotion => (
              <tr key={promotion.id}>
                <td>{promotion.id}</td>
                <td>{promotion.name}</td>
                <td>{promotion.start_day}</td>
                <td>{promotion.minimum_days}</td>
                <td>{promotion.percentual}</td>
                <td>{moment(promotion.createdAt).format('DD/MM/YYYY')}</td>
                <td>
                  <Switch
                    onChange={e => handleStatus(promotion.id, e)}
                    checked={promotion.is_active}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default Promotion;
