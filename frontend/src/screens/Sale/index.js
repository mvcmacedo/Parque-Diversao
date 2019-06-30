import React, { useEffect, useState } from 'react';

import { Container } from './style';

import Table from '../../components/TableReport';

import api from '../../services/api';
import money from '../../assets/sale.png';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState({});

  const fetchSales = async () => {
    const salesList = await api.get(
      `/sale?order=${filters.order || 'DESC'}&after=${filters.after}&before=${
        filters.before
      }&groupBy=${filters.groupBy}`,
    );

    setSales(salesList.data.data);
  };

  useEffect(() => {
    fetchSales();
  }, [filters]);

  const applyFilters = (filter) => {
    setFilters(filter);
  };

  return (
    <Container>
      <Table
        data={sales}
        icon={money}
        title="Vendas"
        applyFilters={applyFilters}
        filters={filters}
        isGrouped={Boolean(filters.groupBy)}
      />
    </Container>
  );
};

export default Sale;
