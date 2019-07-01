import Styled from 'styled-components';

export const Container = Styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

export const Header = Styled.div`
  display: flex;
  justify-content: space-between;
  background: #333333;
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
  margin: 2% 0;
  background: #f2f2f2;
  border: 1px solid #a6a6a6;
  box-shadow: 1px 1px 4px #666666;
`;

export const FormWrapper = Styled.div`
  display: flex;
  justify-content: flex-end;
  background: #f2f2f2;
  padding: 2%;
`;
