import { styled } from 'styled-components';

export const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Side = styled('div')`
  background-color: #535bf2;
  height: 100vh;
`;

export const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Content = styled.div`
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 24px;
`;
