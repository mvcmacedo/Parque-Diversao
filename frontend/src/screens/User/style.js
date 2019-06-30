import Styled from 'styled-components';

export const Container = Styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2%;
`;

export const Header = Styled.div`
  display: flex;
  justify-content: space-between;
  background: #333333;
  width: 100%;
  padding: 2%;
  color: #a6a6a6;
`;

export const Th = Styled.th`
  color: #fff;
  font-weight: bolder;
`;

export const Thead = Styled.thead`
  background: #ff3399;
`;

export const TableWrapper = Styled.div`
  background: #f2f2f2;
  border: 1px solid #a6a6a6;
  box-shadow: 1px 1px 4px #666666;
`;
