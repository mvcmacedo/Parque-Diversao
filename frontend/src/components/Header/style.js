import Styled from 'styled-components';

export const Container = Styled.div`
  background-color: #ff3399;
  padding: 10px 20px;
`;

export const Content = Styled.div`
  display: flex;
  justify-content: space-between;
`;

export const LogoWrapper = Styled.div`
  width: 33%;
`;

export const TitleWrapper = Styled.div`
  width: 33%;
`;
export const Title = Styled.h1`
  display: flex;
  justify-content: center;
  color: #fff;
`;

export const Login = Styled.div`
  display: flex;
  justify-content: flex-end;
  width: 33%;

  button {
    margin: 1%;
    
    a {
      text-decoration: none;
      color: #a6a6a6;
    }
  }
`;

export const UserName = Styled.span`
  color: #fff;
  font-weight: bolder;
  font-size: 16px;
  margin: 2%;
`;
