import React, { useState, useEffect } from 'react';

import { Container } from './style';

import api from '../../services/api';
import Loader from '../../components/Loader';
import Table from '../../components/TablePassport';

const Passport = () => {
  const [passports, setPassports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPassports = async () => {
    await api.get('/passport?order=DESC').then(({ data }) => {
      setLoading(false);
      setPassports(data.data);
    });
  };

  useEffect(() => {
    fetchPassports();
  }, []);

  return (
    <Container>
      {loading ? (
        <Loader width={100} height={100} show={loading} />
      ) : (
        <Table data={passports} fetchPassports={fetchPassports} />
      )}
    </Container>
  );
};
export default Passport;
