import styled from "styled-components";

const AuthWrapper = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;

  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  .logo {
    margin: 0px auto 1.38rem;
    display: block;
  }

  h3 {
    text-align: center;
  }

  .btn {
    margin-top: 1rem;
  }

  .footer {
    text-align: center;
    margin: 1rem 0 0;
  }

  .member-btn {
    background-color: transparent;
    color: var(--primary-500);
    cursor: pointer;
    border: transparent;
    letter-spacing: var(--letterSpacing);
  }
`;

export default AuthWrapper;
