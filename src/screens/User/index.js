import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';
import moment from 'moment';

import { Table } from 'react-bootstrap';

import {
  Container, Thead, Th, Header, TableWrapper,
} from './style';

import api from '../../services/api';
import user from '../../assets/user.png';

const User = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const userList = await api.get('/user');

    setUsers(userList.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatus = async (id, is_admin) => {
    await api.put(`/user/${id}`, { is_admin });

    await fetchUsers();
  };

  return (
    <Container>
      <TableWrapper>
        <Header>
          <img src={user} alt="logo" />
          <h1>Usuários</h1>
        </Header>
        <Table striped borderless hover responsive>
          <Thead>
            <tr>
              <Th>#</Th>
              <Th>Nome</Th>
              <Th>Username</Th>
              <Th>Email</Th>
              <Th>Idade</Th>
              <Th>Criado em</Th>
              <Th>Admin</Th>
            </tr>
          </Thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{moment(user.createdAt).format('DD/MM/YYYY')}</td>
                <td>
                  <Switch onChange={e => handleStatus(user.id, e)} checked={user.is_admin} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </Container>
  );
};

export default User;
