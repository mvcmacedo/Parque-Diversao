import React, { useEffect, useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { Container } from './style';

import Table from '../../components/TableReport';
import Loader from '../../components/Loader';

import api from '../../services/api';
import money from '../../assets/sale.png';

const Sale = () => {
  const [sales, setSales] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchSales = async () => {
    await api
      .get(
        `/sale?order=${filters.order || 'DESC'}&after=${filters.after}&before=${
          filters.before
        }&groupBy=${filters.groupBy}`,
      )
      .then(({ data }) => {
        setSales(data.data);
        setLoading(false);
      })
      .catch(() => toast.error('Erro ao listar vendas.'));
  };

  useEffect(() => {
    fetchSales();
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
          data={sales}
          icon={money}
          title="Vendas"
          applyFilters={applyFilters}
          filters={filters}
          isGrouped={Boolean(filters.groupBy)}
        />
      )}
    </Container>
  );
};

export default Sale;
