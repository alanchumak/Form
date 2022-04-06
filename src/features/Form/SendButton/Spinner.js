import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerDiv = styled.div`
    border: 2px solid white;
    border-radius: 50%;
    border-right: 2px solid transparent;
    width: 26px;
    height: 26px;
    margin-left: auto;
    margin-right: auto;
    animation: ${rotate} 2s linear infinite;
`;

export const Spinner = () => <SpinnerDiv></SpinnerDiv>