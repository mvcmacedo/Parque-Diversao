import React, { useState, useEffect } from 'react';

import { Container } from './style';

import api from '../../services/api';
import Table from '../../components/TablePassport';

const Passport = () => {
  const [passports, setPassports] = useState([]);

  useEffect(() => {
    async function fetchPassports() {
      const passportsList = await api.get('/passport');

      setPassports(passportsList.data.data);
    }

    fetchPassports();
  }, []);

  return (
    <Container>
      <Table data={passports} />
    </Container>
  );
};
export default Passport;
