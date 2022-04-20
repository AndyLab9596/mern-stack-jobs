import styled from "styled-components";

const ErrorWrapper = styled.div`
  display: grid;
  place-items: center;
  text-align: center;
  min-height: 100vh;
  img {
    max-width: 600px;
    display: block;
    margin-bottom: 2rem;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  p {
    margin-top: 0px;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
  a {
    text-decoration: underline;
    text-transform: capitalize;
    color: var(--primary-500);
  }
`;

export default ErrorWrapper;
