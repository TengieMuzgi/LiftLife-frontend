import styled from 'styled-components';

export const SignInImage = styled('img')`
  @media (max-width: 425px) {
    max-width: 100vw;
    margin-top: 0;
  }
  @media (min-width: 1024px) {
    max-width: 55vw;
    object-fit: cover;
    min-height: auto;
    border-radius: 45px 0 0 45px;
    padding: 4px 0 0 4px;
    clip-path: polygon(43% 0, 100% 100%, 0% 100%, 0 51%, 0% 0%);
  }
`;