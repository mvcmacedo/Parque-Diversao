import React, { useState, useEffect } from 'react';
import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Table, Form, Col } from 'react-bootstrap';
import month from '../../helpers/month';

import {
  Container, Header, Th, Thead, FormWrapper,
} from './style';

const TableReport = ({
  data, icon, title, applyFilters, filters, isGrouped,
}) => {
  const [before, setBefore] = useState(filters.before);
  const [after, setAfter] = useState(filters.after);
  const [groupBy, setGroupBy] = useState(filters.groupBy);
  const [order, setOrder] = useState(filters.order);

  useEffect(() => {
    applyFilters({
      groupBy,
      order,
      before: before ? moment(before).format('YYYY-MM-DD') : '',
      after: after ? moment(after).format('YYYY-MM-DD') : '',
    });
  }, [before, after, groupBy, order]);

  return (
    <Container>
      <FormWrapper>
        <Form as={Col} sm="12">
          <Form.Row>
            <Form.Group as={Col} sm="3">
              <DatePicker
                className="form-control"
                placeholderText="Data Inicial"
                dateFormat="dd/MM/yyyy"
                selected={after}
                onChange={e => setAfter(e)}
              />
            </Form.Group>

            <Form.Group as={Col} sm="3">
              <DatePicker
                className="form-control"
                placeholderText="Data Final"
                dateFormat="dd/MM/yyyy"
                selected={before}
                onChange={e => setBefore(e)}
              />
            </Form.Group>

            <Form.Group as={Col} sm="3" controlId="">
              <Form.Control as="select" onChange={e => setGroupBy(e.target.value)}>
                <option value="">Agrupar por</option>
                <option value="day">Dia</option>
                <option value="month">Mês</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} sm="3" controlId="">
              <Form.Control as="select" onChange={e => setOrder(e.target.value)}>
                <option value="">Ordenar</option>
                <option value="DESC">Mais recentes</option>
                <option value="ASC">Mais antigos</option>
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
      </FormWrapper>
      <Header>
        <img src={icon} alt="ticket-logo" />
        <h1>{title}</h1>
      </Header>
      <Table striped borderless hover responsive>
        <Thead>
          {isGrouped ? (
            <tr>
              <Th>Dia</Th>
              <Th>Mês</Th>
              <Th>Ano</Th>
              {data.length && data[0].cost && <Th>Preço</Th>}
              <Th>{title}</Th>
            </tr>
          ) : (
            <tr>
              <Th>#</Th>
              {data.length && data[0].amount && <Th>Preço</Th>}
              <Th>Id do Passaporte</Th>
              <Th>Data</Th>
            </tr>
          )}
        </Thead>
        <tbody>
          {isGrouped
            ? data.map(d => (
              <tr key={d.id}>
                <td>{d.day || '--'}</td>
                <td>{month[d.month]}</td>
                <td>{d.year}</td>
                {d.cost && <td>{`R$ ${d.cost.toFixed(2).replace('.', ',')}`}</td>}
                <td>{title === 'Vendas' ? d.sales : d.entries}</td>
              </tr>
            ))
            : data.map(d => (
              <tr key={d.id}>
                <td>{d.id}</td>
                {d.amount && <td>{`R$ ${d.amount.toString().replace('.', ',')}`}</td>}
                <td>{d.passport_id}</td>
                <td>{moment(d.date).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default TableReport;
