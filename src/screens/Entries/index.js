import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { Container } from './style';

import Table from '../../components/TableReport';
import Loader from '../../components/Loader';

import api from '../../services/api';
import gate from '../../assets/gate.png';

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    await api
      .get(
        `/entries?order=${filters.order || 'DESC'}&after=${filters.after}&before=${
          filters.before
        }&groupBy=${filters.groupBy}`,
      )
      .then(({ data }) => {
        setEntries(data.data);
        setLoading(false);
      })
      .catch(() => toast.error('Ocorreu algum erro ao listar entradas.'));
  };

  useEffect(() => {
    fetchEntries();
  }, [filters]);

  const applyFilters = (filter) => {
    setFilters(filter);
  };

  return (
    <Container>
      <ToastContainer />
      {loading ? (
        <Loader width={100} height={100} show={loading} />
      ) : (
        <Table
          data={entries}
          icon={gate}
          title="Entradas"
          applyFilters={applyFilters}
          filters={filters}
          isGrouped={Boolean(filters.groupBy)}
        />
      )}
    </Container>
  );
};

export default Entries;
