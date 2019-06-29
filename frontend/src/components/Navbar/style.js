import Styled from 'styled-components';

export const Container = Styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background: #f8f9fa;

  .nav-link {
    padding: 0 1.5rem 0 1.5rem !important;
    
    &:hover {
      color: #ff3399 !important;
    }
  }
`;
