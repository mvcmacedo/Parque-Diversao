import React, { useEffect, useState } from 'react';

import { Container } from './style';

import Table from '../../components/TableReport';

import api from '../../services/api';
import gate from '../../assets/gate.png';

const Entries = () => {
  const [entries, setEntries] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchEntries = async () => {
    const entriesList = await api.get(
      `/entries?order=${filters.order || 'DESC'}&after=${filters.after}&before=${
        filters.before
      }&groupBy=${filters.groupBy}`,
    );

    setEntries(entriesList.data.data);
  };

  useEffect(() => {
    fetchEntries();
  }, [filters]);

  const applyFilters = (filter) => {
    setFilters(filter);
  };

  return (
    <Container>
      <Table
        data={entries}
        icon={gate}
        title="Entradas"
        applyFilters={applyFilters}
        filters={filters}
        isGrouped={Boolean(filters.groupBy)}
      />
    </Container>
  );
};

export default Entries;
